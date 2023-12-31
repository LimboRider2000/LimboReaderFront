import {Component, inject} from '@angular/core';
import {BookPostService} from "../../../../Servises/DataService/Book-post/book-post.service";

@Component({
  selector: 'app-global-search',
  templateUrl: './global-search.component.html',
  styleUrls: ['./global-search.component.css']
})
export class GlobalSearch {
  public searchString:string ="";

  private readonly BookService = inject(BookPostService)
  private readonly bookService = inject(BookPostService)

  Submit() {
    this.searchString = this.searchString.trim()
    if(this.searchString.length >=2){
      this.BookService.getBookCollectionBySearchString(this.searchString)
    }else console.error("Client: no search data")
  }

  resetFilter() {
    this.bookService.reInitBookCollection();
    this.bookService.filterBookCountInitObservable(0);
    this.searchString ="";
  }
}
