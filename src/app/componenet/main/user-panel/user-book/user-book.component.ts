import {Component, inject, OnInit} from '@angular/core';
import {BookPostService} from "../../../../Servises/DataService/Book-post/book-post.service";

@Component({
  selector: 'app-user-book',
  templateUrl: './user-book.component.html',
  styleUrls: ['./user-book.component.css']
})
export class UserBookComponent implements OnInit{
  private bookService = inject(BookPostService)
  private userId: string| null = sessionStorage.getItem('Id')
  ngOnInit(): void {
    if(this.userId != null)
    this.bookService.getBookCollectionByUserId(this.userId)
  }

}
