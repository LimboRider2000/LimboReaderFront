import {Component, HostListener, Injectable, OnDestroy, OnInit} from '@angular/core';
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
export class SidebarComponent implements OnInit,OnDestroy{
 genreSubGenreCollection:GenreSubgenreItem[];
 constructor(private genreSubGenreService:GenreSubGenreCollectionService) {
 }

  ngOnInit(): void {
    this.genreSubGenreService.getGenreCollectionObservable().subscribe(
      (collection) => this.genreSubGenreCollection = collection
    )
  }

  protected readonly SubGenre = SubGenre;
  @HostListener("window:beforeunload", ["$event"])
  ngOnDestroy(): void {
    if(this.genreSubGenreCollection.length > 0 )
      sessionStorage.setItem("genreSubGenreCollection",JSON.stringify(this.genreSubGenreCollection,
        (key, value)=>{
       return  value as GenreSubgenreItem;
      }))}



}
