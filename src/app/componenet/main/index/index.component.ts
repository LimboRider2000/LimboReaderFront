import {Component, inject, OnInit} from '@angular/core';
import {BookPostService} from "../../../Servises/DataService/Book-post/book-post.service";
import {Book} from "../../../model/Book/Book";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit{
  public bookCollection: Book[]
  public perPage : number = 5;
  public currentPage : number = 1;
  public pageCount: number;

  public pageStock : number[] = [];
  private filterBookById:string="";
  private bookService = inject(BookPostService)
  ngOnInit(): void {

    this.bookService.getBookCollection().subscribe(
      (data:any)=>{
        this.bookCollection = data;
      }
  );
    this.bookService.getFilterSybGenreById().subscribe(
      (data:string)=>this.filterBookById = data
    )
    this.bookService.bookCountObservable().subscribe(
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

    this.bookService.getBookCollection().subscribe(
      (data:any)=>{
        this.bookCollection = data;});

  }
  PreviousPage() {
    this.currentPage--;

    if(this.filterBookById === "" || this.filterBookById == null)
      this.bookService.getSliceBook(this.currentPage)
    else
      this.bookService.getBookSliceBySybGenreFilter(this.filterBookById,this.currentPage)

    this.pageStockCalculation()
    this.bookService.getBookCollection().subscribe(
      (data:any)=>{
        this.bookCollection = data;});
  }

  SelectPage(page:number) {
    this.currentPage = page

    if(this.filterBookById === "" || this.filterBookById == null)
      this.bookService.getSliceBook(this.currentPage)
    else
      this.bookService.getBookSliceBySybGenreFilter(this.filterBookById,this.currentPage)

    this.pageStockCalculation()
    this.bookService.getBookCollection().subscribe(
      (data:any)=>{
        this.bookCollection = data;});
  }
}
