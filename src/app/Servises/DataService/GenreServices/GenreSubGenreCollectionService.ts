import {inject, Injectable} from "@angular/core";
import {GenreSubgenreItem} from "../../../model/Genres/GenreSubgenreItem";
import {BehaviorSubject} from "rxjs";
import {Genre} from "../../../model/Genres/Genre";
import {GenreServices} from "./GenreServices";
import {SubGenre} from "../../../model/Genres/SubGenre";

@Injectable()
export class GenreSubGenreCollectionService{
 private  genreSubjectCollection : GenreSubgenreItem[]= [];
 private collectionSubject : BehaviorSubject<GenreSubgenreItem[]> = new BehaviorSubject<GenreSubgenreItem[]>(this.genreSubjectCollection)

 private genreService = inject(GenreServices)
  constructor() {
    if(this.genreSubjectCollection.length === 0){
     const sessionVar =  sessionStorage.getItem("genreSubGenreCollection");
      if(sessionVar === null|| sessionVar === undefined || sessionVar === "undefined" )
      this.initGenreCollection();
      else {
        this.genreSubjectCollection = JSON.parse(sessionVar,(key, value)=>value as GenreSubgenreItem) as GenreSubgenreItem[]
        this.collectionSubject.next(this.genreSubjectCollection.slice())
        sessionStorage.removeItem("genreSubGenreCollection");
      }
    }
  }


  getGenreCollectionObservable(){
   return this.collectionSubject.asObservable()
  }
  addToCollection(item: Genre) {
    const collectionItem = new GenreSubgenreItem()
    collectionItem.genre = item

    this.genreSubjectCollection.push(collectionItem);
    this.collectionSubject.next(this.genreSubjectCollection.slice()); // Отправляем обновленную копию коллекции
  }
  addSubGenreToCollection(newSubGenre: SubGenre, genreId:string) {
    this.genreSubjectCollection.forEach(item => {
       if( item.genre.id === genreId){
         item.subGenreCollection.push(newSubGenre)
       }
    })
  }
  removeGenreFromCollection(GenreId:string ) {
    const index = this.genreSubjectCollection
                          .findIndex((item)=> item.genre.id === GenreId);
    if (index !== -1) {
      this.genreSubjectCollection.splice(index, 1);
      this.collectionSubject.next(this.genreSubjectCollection.slice()); // Отправляем обновленную копию коллекции
    }
  }
  removeSubGenreFromCollection(genreId:string,subGenreId:string ) {
    const index = this.genreSubjectCollection
                          .findIndex((item)=> item.genre.id === genreId);
    if (index !== -1) {
      const subIndex = this.genreSubjectCollection[index].subGenreCollection
                                .findIndex((item) =>item.id === subGenreId);
      this.genreSubjectCollection[index].subGenreCollection.splice(subIndex,1)
      this.collectionSubject.next(this.genreSubjectCollection.slice()); // Отправляем обновленную копию коллекции
    }
  }
  editGenre(data:any) {
    const index = this.genreSubjectCollection
          .findIndex((item) => item.genre.id === data.id);

     if (index !== -1) {
       this.genreSubjectCollection[index].genre.genreName = data.genreName ;
       this.collectionSubject.next(this.genreSubjectCollection.slice()); // Отправляем обновленную копию коллекции
    }
  }
  editSubGenre(genreId: string, subGenreId: string, editSubGenreObj: any) {
    const index = this.genreSubjectCollection
      .findIndex((item) => item.genre.id === genreId)
    if (index !== -1){
       const subIndex =  this.genreSubjectCollection[index]
                                .subGenreCollection.findIndex((item)=>item.id === subGenreId);
      if(subIndex !== -1){
        this.genreSubjectCollection[index]
             .subGenreCollection[subIndex].subGenreName = editSubGenreObj
      }
    }
  }

  initGenreCollection()
  {
    this.genreService.getInitialDate().subscribe(
      (data: any) => {
        for (const item of data) {
          const currGenre: Genre = new Genre()
          currGenre.id = item.genre.id;
          currGenre.genreName = item.genre.genreName;

          const genreSubGenre = new GenreSubgenreItem();
          genreSubGenre.genre = item.genre;
          if (item.subGenreList !== null && item.subGenreList.length > 0)
            genreSubGenre.subGenreCollection = item.subGenreList
          this.genreSubjectCollection.push(genreSubGenre)
        }
      },
      error => console.log(error)
    )
  }



}
