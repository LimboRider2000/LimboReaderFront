import {Component, inject, OnInit} from '@angular/core';
import { Observable} from "rxjs";
import {Book} from "../../../../model/Book/Book";
import {BookPostService} from "../../../../Servises/DataService/Book-post/book-post.service";
import {MatTableDataSource} from "@angular/material/table";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  private readonly bookService = inject(BookPostService)

  dataSource: MatTableDataSource<Book>;
  displayedColumns: string[] = ['tittle', 'author', 'user', 'action'];
  total$:Observable< number> = this.bookService.bookCountObservable();
  pageSize: number = 5;
  total:number;


  ngOnInit(): void {
   this.bookService.BookCollectionObservable().subscribe(
     {
       next:(data)=>
         this.dataSource = new MatTableDataSource<Book>(data)
     })

     this.total$.subscribe(
       {
         next:(data:number)=>
    {
      this.total = data;
    }})

   }

  onChangePage($event: PageEvent) {
    this.bookService.getSliceBook($event.pageIndex+1)
  }



  bookDelete(element: Book) {
    this.bookService.deleteBook(element)
  }
}
