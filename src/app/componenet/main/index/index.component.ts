import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {BookPostService} from "../../../Servises/DataService/Book-post/book-post.service";
import {Book} from "../../../model/Book/Book";
import {Observable, Subscription} from "rxjs";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit,OnDestroy{
  public bookCollection$: Observable<Book[]>
  public perPage : number = 5;
  public currentPage : number = 1;
  public pageCount: number;

  public pageStock : number[] = [];
  private filterBookById:string ="";
  private filterBookIdSub: Subscription;
  private BookCountSubscription: Subscription;
  private bookService = inject(BookPostService)
  ngOnInit(): void {
    this.bookCollection$ =this.bookService.getBookCollection()

  this.filterBookIdSub =this.bookService.getFilterSybGenreById().subscribe(
      (data:string)=>this.filterBookById = data
    )
   this.BookCountSubscription= this.bookService.bookCountObservable().subscribe(
      (data)=>{
        let bookCount = data
        if(bookCount != null && bookCount != 0)
          this.pageCount = Math.ceil( bookCount / this.perPage  )
        this.pageStockCalculation();
      }
    )
  }
 private pageStockCalculation(){
    this.pageStock = []
    let fromPage = this.currentPage > 2 ?this.currentPage - 1 : 1;
    for(let i = 0;i < 3;i++){
      this.pageStock[i] = fromPage++;
      if(fromPage > this.pageCount){
        return
      }
    }
  }
  NextPage() {
    this.currentPage++;

    if(this.filterBookById === "" || this.filterBookById == null)
      this.bookService.getSliceBook(this.currentPage)
    else
      this.bookService.getBookSliceBySybGenreFilter(this.filterBookById,this.currentPage)

    this.pageStockCalculation()

    this.bookCollection$ =this.bookService.getBookCollection()
  }
  PreviousPage() {
    this.currentPage--;

    if(this.filterBookById === "" || this.filterBookById == null)
      this.bookService.getSliceBook(this.currentPage)
    else
      this.bookService.getBookSliceBySybGenreFilter(this.filterBookById,this.currentPage)

    this.pageStockCalculation()
    this.bookCollection$ =this.bookService.getBookCollection()
  }

  SelectPage(page:number) {
    this.currentPage = page

    if(this.filterBookById === "" || this.filterBookById == null)
      this.bookService.getSliceBook(this.currentPage)
    else
      this.bookService.getBookSliceBySybGenreFilter(this.filterBookById,this.currentPage)

    this.pageStockCalculation()
     this.bookCollection$ =this.bookService.getBookCollection()

  }

  ngOnDestroy(): void {
    this.filterBookIdSub.unsubscribe()
    this.BookCountSubscription.unsubscribe()
  }
}
