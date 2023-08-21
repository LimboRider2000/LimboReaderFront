
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
  private http = inject(HttpClient)
  private bookCollection: Book[] = [];
  private collectionSubject: BehaviorSubject<Book[]> = new BehaviorSubject<Book[]>(this.bookCollection)

  newPostAdd(data: any) {
    return this.http.post(this.serverUrl, data)
  }
  addToCollection(data:Book){
    this.bookCollection.push(data);
    this.collectionSubject.next(this.bookCollection.slice());
  }

  BookCollectionObservable() {
    return this.collectionSubject.asObservable()
  }
 private initBookCollection() {
   let  count:number = 0;
    this.http.get<Book[]>(this.serverUrl).subscribe(
      (data:Book[])=>{
        data.forEach(item=>this.bookCollection.push(item))
      },
      error => {console.log(error)
        ++count
        if(count<3)
        setTimeout(()=>{
          this.initBookCollection()
        },2000)
      }
    )
  }


  getBookCollection() {
    if(this.bookCollection.length === 0) this.initBookCollection()
  return  this.BookCollectionObservable()
  }

  getBuId(id: string ) {
        return this.http.get<Book>(this.serverUrl+"/"+id)
  }
}
