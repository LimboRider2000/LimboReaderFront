import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {serverAddress} from "../../../Servises/DataService/ServerAddress";
import {PDFDocumentProxy} from "ng2-pdf-viewer";
import {UnreadBookCollection} from "../../../model/Book/UnreadBookCollection";
import {UnreadBook} from "../../../model/Book/UnreadBook";
import {User} from "../../../model/User/User";




@Component({
  selector: 'app-online-reader',
  templateUrl: './online-reader.component.html',
  styleUrls: ['./online-reader.component.css']
})
export class OnlineReaderComponent implements OnInit, OnDestroy{
  readerData:any;
  totalPages: number;
  page:number = 1;
  isLoaded:boolean = true;
  riderHeight:number= window.innerHeight - 240;
  isAuthorizeUser:boolean = (sessionStorage.getItem("user") !== null);
  unreadBookCollection :UnreadBookCollection | null;
  protected readonly serverAddress = serverAddress;
  private user: User;
  ngOnInit(): void {
  if (this.isAuthorizeUser){
      this.user =JSON.parse( sessionStorage.getItem("user")! );
    this.unreadBookCollection = this.getCollectionFromLocalStorage()
    if(this.unreadBookCollection !== null) {
      if (this.unreadBookCollection.collection
        .find((element) => element.bookId === history.state.id)) {
        const index = this.unreadBookCollection.collection.findIndex((element) => element.bookId === history.state.id)
        this.page = this.unreadBookCollection.collection[index].page
      }
    }
    }
    this.readerData = history.state
  }
callBackFn(pdf:PDFDocumentProxy){
    this.totalPages = pdf.numPages;
    this.isLoaded = true;
}
  nextPage(){
    ++this.page;
    if(this.isAuthorizeUser)
    this.writeToUnreadBookCollection()
  }
  prevPage(){
    --this.page;
    if(this.isAuthorizeUser)
    this.writeToUnreadBookCollection()
  }
  private writeToUnreadBookCollection() {
    //инициализируем если нет коллекции книг
    if(this.unreadBookCollection === null){
      this.unreadBookCollection = new  UnreadBookCollection();
        this.unreadBookCollection.collection = []
        this.user = JSON.parse( sessionStorage.getItem("user")!)
        this.unreadBookCollection.collection.push(this.initUnreadBook());
    }
    // если на local есть начатые книги меняем страницу
    else if(this.unreadBookCollection.collection
      .find((element)=> element.bookId === history.state.id)){
      const index =  this.unreadBookCollection.collection.
      findIndex((element)=> element.bookId === history.state.id)

      this.unreadBookCollection.collection[index].page = this.page;
    }
// если есть массив, но книги нет инициализируем unreadBook добавляем в collection
  else if(this.unreadBookCollection.collection
     .find((element)=> element.bookId === history.state.id) === undefined){
     this.unreadBookCollection.collection.push(this.initUnreadBook());
   }
  }
  private initUnreadBook(): UnreadBook{
    const unreadBook = new UnreadBook()
    unreadBook.bookId = history.state.id
    unreadBook.page =this.page
    unreadBook.path = history.state.path
    unreadBook.tittle = history.state.title
    unreadBook.author = history.state.author
    return unreadBook;
  }

  private getCollectionFromLocalStorage():UnreadBookCollection | null{
if(localStorage.getItem("UnreadBook" + this.user.id) != null) {
  const localString: string | null = localStorage.getItem("UnreadBook" + this.user.id) as string;
  if (localString) {
    const collection = JSON.parse(localString) as UnreadBookCollection
    if (collection === null || collection === undefined) return null
    return collection
  }
}
    return null;
  }
  @HostListener('window:beforeunload', ["$event"])
    saveToLocalStorage(){
    if(this.isAuthorizeUser)
      localStorage.setItem("UnreadBook" + this.user.id, JSON.stringify(this.unreadBookCollection))
  }

  ngOnDestroy(): void {
    if(this.isAuthorizeUser)
      localStorage.setItem("UnreadBook" + this.user.id, JSON.stringify(this.unreadBookCollection))
  }

}
