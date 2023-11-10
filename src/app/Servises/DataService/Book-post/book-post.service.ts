import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {serverAddress} from "../ServerAddress";
import {Book} from "../../../model/Book/Book";
import {BehaviorSubject, Observable} from "rxjs";
import {UserService} from "../User/user.service";

@Injectable({
  providedIn: 'root'
})
export class BookPostService{

  serverUrl = serverAddress + "api/Book"
  private bookCollection: Book[] = [];
  private userBooksCollection: Book[] =[];
  private filterBookCount: number = 0;
  private globalBookNumber: number = 0;
  private filterSubGenreId: string="";
  private answerPass = true;


  private readonly http = inject(HttpClient)
  private readonly collectionSubject: BehaviorSubject<Book[]> = new BehaviorSubject<Book[]>(this.bookCollection)
  private readonly answerSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.answerPass)
  private readonly filterBookCountSubject: BehaviorSubject<number> = new BehaviorSubject<number>(this.filterBookCount)
  private readonly globalBookCountSubject: BehaviorSubject<number> = new BehaviorSubject<number>(this.globalBookNumber)
  private readonly filterSubGenreIdSubject: BehaviorSubject<string> = new BehaviorSubject<string>(this.filterSubGenreId)
  private readonly userBookCollectionSubject: BehaviorSubject<Book[]> = new BehaviorSubject<Book[]>(this.userBooksCollection)
  private readonly userService = inject(UserService)


  //region Observable
  answerPassObserver(){
    return this.answerSubject.asObservable();
  }
  filterBookCountObservable() {
    return this.filterBookCountSubject.asObservable()
  }
  getGlobalBookCountObservable() {
    return this.globalBookCountSubject.asObservable()
  }
  BookCollectionObservable() {
    return this.collectionSubject.asObservable()
  }
  getFilterSybGenreByIdObservable(){
    return this.filterSubGenreIdSubject.asObservable()
  }

 getUserBookCollectionObservable():Observable<Book[]>{
    return this.userBookCollectionSubject.asObservable()
 }
  //endregion
  public filterBookCountInitObservable(count: number) {
    this.filterBookCountSubject.next(this.filterBookCount = count)
  }
  //region AddMethod
  newPostAdd(data: any) {
    return this.http.post(this.serverUrl, data)
  }
  addToCollection(data: Book) {
    this.bookCollection.unshift(data);
    this.collectionSubject.next(this.bookCollection);
    this.globalBookNumber++;
    this.globalBookCountSubject.next(this.globalBookNumber)
  }
  //endregion
addBookNumber(){
  this.globalBookCountSubject.next(this.globalBookNumber++)
}
  //region GetBOOK
  getSliceBook(page: number) {
    this.answerPass = false;
    this.answerSubject.next(this.answerPass);
    this.http.get(this.serverUrl + "/?page=" + page)
      .subscribe({
        next: (data: any) => {
          let bookCol: Book[] = data.listTransfer;
          this.bookCollectionInit(bookCol)
          this.filterBookCountInitObservable(data.bookCount);
        },
        error:error => {

          console.log(error.error)
        },
        complete:()=>{
          this.answerPass = true
          this.answerSubject.next(this.answerPass);}
        }
      )
  }
  getBookCollection(count:number = 0) {
    if (this.bookCollection.length === 0){
      this.initBookCollection().subscribe(
        {
          next:(data:any)=>{
            let bookCol: Book[] = data.listTransfer;
            bookCol.map(item => this.bookCollection.push(item))
            this.collectionSubject.next(this.bookCollection)
            this.filterBookCount = data.bookCount;
            this.filterBookCountSubject.next(this.filterBookCount)
            this.globalBookNumber = this.filterBookCount;
            this.globalBookCountSubject.next(this.filterBookCount)

          },
          error:(error)=>{
            console.log(error)
            ++count
            if (count < 5)
              setTimeout(() => {
                this.getBookCollection(count)
              }, 3000)

          },complete:()=>{
            //initialize user count here: because we always update book list
            this.userService.getUserCount()}
        }
      )
      this.filterSubGenreIdSubject.next((this.filterSubGenreId = ""))
    }
    return this.BookCollectionObservable()
  }
  getBuId(id: string) {
    return this.http.get<Book>(this.serverUrl + "/" + id)
  }
  reInitBookCollection(){
    this.bookCollection =[]
    this.getBookCollection()
  }
  getBookSliceBySybGenreFilter(id: string, currentPage:number = 1) {
    this.http.get(this.serverUrl +"/filterBySubGenre"+"/?subGenreId=" + id+"&page="+currentPage).subscribe(
      (data: any) => {
        let bookCol: Book[] = data.listTransfer;
        this.bookCollectionInit(bookCol)
        this.filterBookCountInitObservable(data.bookCount);
        this.filterSubGenreIdSubject.next((this.filterSubGenreId = id))

      },
      error => {
        console.log(error.error)
      }
    )
  }
  getBookCollectionBySearchString(searchString: string) {
    this.http.get<Book[]>(this.serverUrl+"/bySearchSting/?search="+searchString).subscribe(
      (data:Book[])=>{
        this.bookCollectionInit(data)
        this.filterBookCountInitObservable(data.length);
      },
      error => {console.error(error)}
    )
  }
  getBookCollectionByUserId(userId:string){
    this.http.get<Book[]>(this.serverUrl+"/getBookByUserId/?userId="+userId)
      .subscribe(
        (data:Book[])=>{
          this.userBooksCollection = []
          if(data.length != null) {
            data.map(book=>this.userBooksCollection.push(book))
            this.userBookCollectionSubject.next(this.userBooksCollection.slice())
          }
        },
        error => console.error(error.error)
      )
  }

  //endregion

  //region HelpPrivateFunc
  private bookCollectionInit(collection: Book[]) {
    this.bookCollection = []
    collection.map((item:Book) => this.bookCollection.push(item))
    this.collectionSubject.next(this.bookCollection)
  }

  private initBookCollection() {
     return  this.http.get(this.serverUrl)
  }
  //endregion
  editService(formData: FormData) {
  return   this.http.put(this.serverUrl,formData)

  }

  deleteBook(book: Book) {
    this.http.delete(this.serverUrl+'/?id='+ book.id).subscribe(
      {
        next:()=>{
        this.bookCollection =  this.bookCollection.filter(b=> b.id !== book.id)
          this.collectionSubject.next(this.bookCollection)
        }
      }
    )
  }
}
