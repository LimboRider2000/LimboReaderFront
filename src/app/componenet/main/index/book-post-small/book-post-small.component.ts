import {Component, inject, Input} from '@angular/core';
import {Book} from "../../../../model/Book/Book";
import {serverAddress} from "../../../../Servises/DataService/ServerAddress";
import {FormatDataStringService} from "../../../../Servises/format-data-string.service";

@Component({
  selector: 'app-book-post-small',
  templateUrl: './book-post-small.component.html',
  styleUrls: ['./book-post-small.component.css']
})
export class BookPostSmallComponent {
  @Input() bookData : Book;
  protected readonly serverAddress = serverAddress;
  public dateService = inject(FormatDataStringService)

}
