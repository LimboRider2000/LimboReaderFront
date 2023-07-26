import {Component, Input, OnInit} from '@angular/core';
import {Genre} from "../../../../model/Genres/Genre";
import {GenreServices} from "../../../../Servises/DataService/GenreServices/GenreServices";
import {GenreSubgenreItem} from "../../../../model/Genres/GenreSubgenreItem";
import {SubGenre} from "../../../../model/Genres/SubGenre";

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.css']
})
export class GenresComponent implements OnInit{
 @Input() isGenreSelected: boolean = false;
 @Input() isSubGenreSelected : boolean = false;
 @Input() genre :string;
 @Input() subGenre: string;
 @Input() message: string;
 @Input() genreSelectList : Genre[]  =[];
 @Input() subGenreSelectList:SubGenre[]=[];
 @Input() collectionGenreSubGenre:GenreSubgenreItem[] = []
  private genre_id:string;

  ngOnInit(): void {
   this.genreServices.getInitialDate().subscribe(
     (data:any)=>{
       for (const item of data) {
         const currGenre:Genre = new Genre()
         currGenre.id = item.genre.id;
         currGenre.genreName = item.genre.genreName;
         this.genreSelectList.push(currGenre);

         const genreSubGenre = new GenreSubgenreItem();
         genreSubGenre.genre = item.genre;
         if(item.subGenreList !== null && item.subGenreList.count > 0 )
         genreSubGenre.subGenreCollection = item.subGenreList
         this.collectionGenreSubGenre.push(genreSubGenre)
       }
     }
   )
  }
  constructor(private genreServices : GenreServices) {}
  SelectGenre(event:any){
    this.genre_id = event.currentTarget.value
    if (this.genre_id && !this.isGenreSelected) {
      this.isGenreSelected = true;
    }
    if(this.collectionGenreSubGenre.length >0){
      for (const element of this.collectionGenreSubGenre) {
        if(this.genre_id ==  element.genre.id){
          this.subGenreSelectList = element.subGenreCollection;
        }
      }
    }
  }
  public addGenre(){
    if(this.genre ===""|| this.genre === undefined ) {
      this.message = "введите жанр"
      return}

    if(this.genre.length < 3 ) {
        this.message = "Жанр или поджанр должен быть больше 3 символов"
        return;
    }
    this.genreServices.postGenre(this.genre).subscribe(
      (data: any)=>{
        let newGenre = new Genre;
        newGenre.id = data.id;
        newGenre.genreName = data.genreName;
        this.genreSelectList.push(newGenre)
        this.genre = "";
      },
      (error)=>{
        this.message  = error.message
      }
    )
    //TO DO: добавить функцию подключения к серверу и передать название жанра
    //вернуть объект genre;



 }

  public addSubGenre(){
   if(this.subGenre === "" || this.subGenre === undefined ) {
     this.message = "введите поджанр"
     return
   }
    if(this.subGenre.length< 3){
        this.message = "название поджанра должно быть больше 3 символов"
    }


  }
}
