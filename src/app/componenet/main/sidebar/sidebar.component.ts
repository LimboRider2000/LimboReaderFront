import {Component, Injectable, OnInit} from '@angular/core';
import {Genre} from "../../../model/Genres/Genre";
import {SubGenre} from "../../../model/Genres/SubGenre";
import {GenreSubgenreItem} from "../../../model/Genres/GenreSubgenreItem";
import {GenreServices} from "../../../Servises/DataService/GenreServices/GenreServices";
import {inject} from "@angular/core";
import {
  GenreSubGenreCollectionService
} from "../../../Servises/DataService/GenreServices/GenreSubGenreCollectionService";




@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit{
// private  genreService = inject(GenreServices)


 genreSubGenreCollection:GenreSubgenreItem[];
  private  genreSubGenreService = inject(GenreSubGenreCollectionService)
  ngOnInit(): void {
    // this.genreService.getInitialDate().subscribe(
    //   (data: any) => {
    //     for (const item of data) {
    //       const currGenre: Genre = new Genre()
    //       currGenre.id = item.genre.id;
    //       currGenre.genreName = item.genre.genreName;
    //
    //       const genreSubGenre = new GenreSubgenreItem();
    //       genreSubGenre.genre = item.genre;
    //       if (item.subGenreList !== null && item.subGenreList.length > 0)
    //         genreSubGenre.subGenreCollection = item.subGenreList
    //       this.genreSubGenreCollection.push(genreSubGenre)
    //     }
    //   },
    //   error => console.log(error)
    // )
    this.genreSubGenreService.initGenreCollection()
    this.genreSubGenreService.getGenreCollectionObservable().subscribe(
      (collection) => this.genreSubGenreCollection = collection
    )
  }

  protected readonly SubGenre = SubGenre;
}
