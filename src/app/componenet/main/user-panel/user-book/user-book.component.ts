import {Component, inject, OnInit} from '@angular/core';
import {BookPostService} from "../../../../Servises/DataService/Book-post/book-post.service";
import {Observable} from "rxjs";
import {Book} from "../../../../model/Book/Book";

@Component({
  selector: 'app-user-book',
  templateUrl: './user-book.component.html',
  styleUrls: ['./user-book.component.css']
})
export class UserBookComponent implements OnInit {
  private bookService = inject(BookPostService)
  public  userBookCollection$ : Observable<Book[]>  = this.bookService.getUserBookCollectionObservable()
  private userId:string;
  ngOnInit(): void {
      if(sessionStorage.getItem('user')!= null){
        const user = JSON.parse( sessionStorage.getItem('user')!)
        this.userId = user.id
      }

    if(this.userId != null)
    this.bookService.getBookCollectionByUserId(this.userId)
  }

}
