import {Component, HostListener,  OnDestroy, OnInit} from '@angular/core';
import {SubGenre} from "../../../../model/Genres/SubGenre";
import {GenreSubgenreItem} from "../../../../model/Genres/GenreSubgenreItem";
import {inject} from "@angular/core";
import {
  GenreSubGenreCollectionService
} from "../../../../Servises/DataService/GenreServices/GenreSubGenreCollectionService";
import {BookPostService} from "../../../../Servises/DataService/Book-post/book-post.service";




@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit,OnDestroy{
 genreSubGenreCollection:GenreSubgenreItem[];
 private readonly genreSubGenreService : GenreSubGenreCollectionService = inject(GenreSubGenreCollectionService)
  private readonly bookService : BookPostService = inject(BookPostService)
  protected readonly SubGenre = SubGenre;
  genreSubGenreCollection$ =this.genreSubGenreService.getGenreCollectionObservable()

  ngOnInit(): void {
    this.genreSubGenreCollection$.subscribe(
      (collection) => this.genreSubGenreCollection = collection
    )
  }
  @HostListener("window:beforeunload", ["$event"])
  ngOnDestroy(): void {
    if(this.genreSubGenreCollection.length > 0 )
      sessionStorage.setItem("genreSubGenreCollection",JSON.stringify(this.genreSubGenreCollection,
        (key, value)=>{
       return  value as GenreSubgenreItem;
      }))}


  FilterBookBySubGenre(id: string) {
    this.bookService.getBookSliceBySybGenreFilter(id);
  }
}
