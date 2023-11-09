import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {BookPostService} from "../../../Servises/DataService/Book-post/book-post.service";
import {Book} from "../../../model/Book/Book";
import {Observable, Subscription} from "rxjs";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit, OnDestroy{
  public perPage : number = 5;
  public currentPage : number = 1;
  public pageCount: number;
  public pageStock : number[] = [];
  public filterBookCount : number;

  private filterBookBySubGenreId:string ="";
  private filterBookIdSub:Subscription;
  private BookCountSubscription: Subscription;
  private bookService = inject(BookPostService)

  public bookCollection$: Observable<Book[]>;
  isBtnDisable:boolean

  ngOnInit(): void {
    this.bookService.filterBookCountObservable().subscribe(
      {
        next:(data)=>{
         this.filterBookCount = data;
        }
      }
    )

    this.bookService.answerPassObserver().subscribe(
      {
        next:(data:boolean)=> this.isBtnDisable = data
      }
    );
      this.filterBookIdSub =this.bookService.getFilterSybGenreByIdObservable().subscribe(
    (data:string)=>this.filterBookBySubGenreId = data

  )
    this.bookCollection$ = this.bookService.getBookCollection();

   this.BookCountSubscription= this.bookService.filterBookCountObservable().subscribe(
      (data)=>{
        let bookCount = data
        if(bookCount != null && bookCount != 0)
          this.pageCount = Math.ceil( bookCount / this.perPage  )
        this.pageStockCalculation();
      }
    )
  }
 private async pageStockCalculation(){

    if(this.filterBookCount!= undefined && this.filterBookCount != 0 )
      this.pageCount = Math.ceil(this.filterBookCount / this.perPage)

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

    if(this.filterBookBySubGenreId === "" || this.filterBookBySubGenreId == null)
      this.bookService.getSliceBook(this.currentPage)
    else {
      this.bookService.getBookSliceBySybGenreFilter(this.filterBookBySubGenreId, this.currentPage)
    }

    this.bookCollection$ = this.bookService.getBookCollection()

     this.pageStockCalculation()
  }
  PreviousPage() {
    this.currentPage--;

    if(this.filterBookBySubGenreId === "" || this.filterBookBySubGenreId == null)
      this.bookService.getSliceBook(this.currentPage)
    else
      this.bookService.getBookSliceBySybGenreFilter(this.filterBookBySubGenreId,this.currentPage)

    this.bookCollection$ =this.bookService.getBookCollection()
    this.pageStockCalculation()
  }
  SelectPage(page:number) {
    this.currentPage = page

    if(this.filterBookBySubGenreId === "" || this.filterBookBySubGenreId == null)
      this.bookService.getSliceBook(this.currentPage)
    else
      this.bookService.getBookSliceBySybGenreFilter(this.filterBookBySubGenreId,this.currentPage)

    this.bookCollection$ =this.bookService.getBookCollection()
    this.pageStockCalculation()

  }
  ngOnDestroy(): void {
    this.filterBookIdSub.unsubscribe()
    this.BookCountSubscription.unsubscribe()
  }

}
