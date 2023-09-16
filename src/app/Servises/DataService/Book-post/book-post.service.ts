import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {serverAddress} from "../ServerAddress";
import {Book} from "../../../model/Book/Book";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BookPostService {
  serverUrl = serverAddress + "api/Book"
  private bookCollection: Book[] = [];
  private bookNumber: number = 0;
  private globalBookNumber: number = 0;
  private filterSubGenreId: string="";
  private readonly http = inject(HttpClient)
  private readonly collectionSubject: BehaviorSubject<Book[]> = new BehaviorSubject<Book[]>(this.bookCollection)
  private readonly bookCountSubject: BehaviorSubject<number> = new BehaviorSubject<number>(this.bookNumber)
  private readonly globalBookCountSubject: BehaviorSubject<number> = new BehaviorSubject<number>(this.globalBookNumber)
  private readonly filterSubGenreIdSubject: BehaviorSubject<string> = new BehaviorSubject<string>(this.filterSubGenreId)

  newPostAdd(data: any) {
    return this.http.post(this.serverUrl, data)
  }

  addToCollection(data: Book) {
    this.bookCollection.push(data);
    this.collectionSubject.next(this.bookCollection.slice());
  }

  bookCountObservable() {
    return this.bookCountSubject.asObservable()
  }

  getGlobalBookCountObservable() {
    return this.globalBookCountSubject.asObservable()
  }

  BookCollectionObservable() {
    return this.collectionSubject.asObservable()
  }
  getFilterSybGenreById(){
    return this.filterSubGenreIdSubject.asObservable()
  }
  private initBookCollection() {
    let count: number = 0;
    this.http.get(this.serverUrl).subscribe(
      (data: any) => {
        let bookCol: Book[] = data.listTransfer;
        bookCol.forEach(item => this.bookCollection.push(item))
        this.bookNumber = data.bookCount;
        this.bookCountSubject.next(this.bookNumber)
        this.globalBookNumber = this.bookNumber;
        this.globalBookCountSubject.next(this.bookNumber)
      },
      error => {
        console.log(error)
        ++count
        if (count < 3)
          setTimeout(() => {
            this.initBookCollection()
          }, 2000)
      }
    )
  }

  getSliceBook(page: number) {
    this.http.get(this.serverUrl + "/?page=" + page)
      .subscribe(
        (data: any) => {
          let bookCol: Book[] = data.listTransfer;
          this.bookCollectionInit(bookCol)
          this.bookCountInit(data.bookCount);
        },
        error => {
          console.log(error.error)
        }
      )
  }
  getBookCollection() {
    if (this.bookCollection.length === 0){
      this.initBookCollection()
      this.filterSubGenreIdSubject.next((this.filterSubGenreId = ""))
    }
    return this.BookCollectionObservable()
  }
  getBuId(id: string) {
    return this.http.get<Book>(this.serverUrl + "/" + id)
  }
  getBookSliceBySybGenreFilter(id: string, currentPage:number = 1) {
    this.http.get(this.serverUrl +"/filterBySubGenre"+"/?subGenreId=" + id+"&page="+currentPage).subscribe(
      (data: any) => {
        let bookCol: Book[] = data.listTransfer;
        this.bookCollectionInit(bookCol)
        this.bookCountInit(data.bookCount);
        this.filterSubGenreIdSubject.next((this.filterSubGenreId = id))
      },
      error => {
        console.log(error.error)
      }
    )
  }

  private bookCollectionInit(collection: Book[]) {
    this.bookCollection = []
    collection.forEach(item => this.bookCollection.push(item))
    this.collectionSubject.next(this.bookCollection)
  }

  private bookCountInit(count: number) {
    this.bookCountSubject.next(this.bookNumber = count)
  }
}
