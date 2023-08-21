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
  ngOnInit(): void {
    this.bookService.getBookCollection().subscribe(
      (data:any)=>{
        this.bookCollection = data;
      }
  );
  }
  private bookService = inject(BookPostService)

  protected readonly console = console;
}
