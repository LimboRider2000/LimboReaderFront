import {Component, inject, Input, OnInit} from '@angular/core';
import {Genre} from "../../../../model/Genres/Genre";
import {GenreServices} from "../../../../Servises/DataService/GenreServices/GenreServices";
import {GenreSubgenreItem} from "../../../../model/Genres/GenreSubgenreItem";
import {SubGenre} from "../../../../model/Genres/SubGenre";
import {MatDialog} from "@angular/material/dialog";
import {PopupComponent} from "../../../allPopUp/popup/popup.component";
import {ConfirmPopupComponent} from "../../../allPopUp/comform-popup/confirm-popup.component";
import {
  GenreSubGenreCollectionService
} from "../../../../Servises/DataService/GenreServices/GenreSubGenreCollectionService";

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.css']
})
export class GenresComponent implements OnInit {
  @Input() isGenreSelected: boolean = false;
  @Input() isSubGenreSelected: boolean = false;
  @Input() genre: string;
  @Input() subGenre: string;
  @Input() message: string;
  //@Input() genreSelectList: Genre[] = [];
  @Input() subGenreSelectList: SubGenre[] = [];
  @Input() collectionGenreSubGenre: GenreSubgenreItem[];
  private currentSelectGenre?: Genre = new Genre();
  private currentSelectSubGenre?: SubGenre = new SubGenre();
  private genreServices = inject(GenreServices)
  private dialog = inject(MatDialog)
  private genreSubGenreService = inject(GenreSubGenreCollectionService)

  ngOnInit(): void {
    this.genreSubGenreService.getGenreCollectionObservable().subscribe(
      (collection) => {
        this.collectionGenreSubGenre = collection
      }
    )
  }
  public SelectGenre(event: any) {
    this.isSubGenreSelected = false;
    this.isGenreSelected = true;

    if(!this.currentSelectGenre)  this.currentSelectGenre = new Genre()

    this.currentSelectGenre!.id = event.currentTarget.value
    this.currentSelectGenre!.genreName = event.currentTarget[event.currentTarget.selectedIndex].text
    this.currentSelectGenre!.genreName
    if (this.currentSelectGenre && !this.isGenreSelected) {
      this.isGenreSelected = true;
    }
    if (this.collectionGenreSubGenre.length > 0) {
      this.subGenreSelectList.splice(0);
      for (const element of this.collectionGenreSubGenre) {
        if (this.currentSelectGenre.id == element.genre.id) {
          for (const subgenre of element.subGenreCollection) {
            this.subGenreSelectList.push(subgenre)
          }
        }
      }
    }
  }
  public SelectSubGenre(event: any) {
    this.isGenreSelected = false
    this.isSubGenreSelected = true;
    if (event.currentTarget) {
      if (!this.currentSelectSubGenre ) this.currentSelectSubGenre = new SubGenre();
      this.currentSelectSubGenre.id = event.currentTarget.value
      this.currentSelectSubGenre.subGenreName = event.currentTarget[event.currentTarget.selectedIndex].text
    }
  }
  public addGenre() {
    if (this.genre === "" || this.genre === undefined) {
      this.message = "введите жанр"
      return
    }
    if (this.genre.length < 3) {
      this.message = "Жанр или поджанр должен быть больше 3 символов"
      return;
    }
    this.genreServices.addGenre(this.genre).subscribe(
      (data: any) => {
        let newGenre = new Genre;
        newGenre.id = data.id;
        newGenre.genreName = data.genreName;
        this.genreSubGenreService.addToCollection(newGenre)
        this.genre = "";
      },
      (error) => {
        this.message = error.message
      }
    )
  }
  public addSubGenre() {
    if (this.currentSelectSubGenre == undefined) return;
    if (this.currentSelectGenre === undefined) return;
    if (this.subGenre === "" || this.subGenre === undefined) {
      this.message = "введите поджанр"
      return
    }
    if (this.subGenre.length < 3) {
      this.message = "название поджанра должно быть больше 3 символов"
    }

    this.genreServices.postSubGenre(this.currentSelectGenre.id, this.subGenre).subscribe(
      (data: any) => {
        const newSubGenre = new SubGenre();
        newSubGenre.subGenreName = data.subGenreName;
        newSubGenre.id = data.id;
        this.subGenreSelectList.push(newSubGenre)
        this.genreSubGenreService.addSubGenreToCollection(newSubGenre,this.currentSelectGenre!.id )
        this.subGenre = ""
      },
      error => {
        console.log(error)
        this.message = error.error
      }
    )

  }
  public changeGenre(event: any) {
    if (this.currentSelectGenre === undefined) return
    const popupData = this.dialog.open(PopupComponent, {
      width: "auto",
      enterAnimationDuration: 300,
      exitAnimationDuration: 300,
      data: {
        title: "Редактировать жанр",
        selectedGenre: this.currentSelectGenre.genreName
      }
    });
    popupData.afterClosed().subscribe(item => {
      if (item === "" || item === undefined) return
      if (this.currentSelectGenre === undefined) return
      this.genreServices.editGenre(item, this.currentSelectGenre.id).subscribe(
        (data: any) => {
              this.genreSubGenreService.editGenre(data)
        },
        (error) => this.message = error
      )
    })
  }
  public changeSubGenre(event: any) {
    //if (this.currentSelectSubGenre === undefined) return
   // const subGenreSelectObject = document.getElementById("subGenre")
   // if (subGenreSelectObject)
    //  subGenreSelectObject.querySelectorAll("option[selected]")
     //   .forEach(option => option.removeAttribute("selected"));
    const popupData = this.dialog.open(PopupComponent, {
      width: " 30%",
      enterAnimationDuration: 300,
      exitAnimationDuration: 300,
      data: {
        title: "Редактировать поджанр",
        selectedGenre: this.currentSelectSubGenre!.subGenreName
      }
    });
    popupData.afterClosed().subscribe(item => {
        if (item === "" || item === undefined) return

        this.genreServices.editSubGenre(this.currentSelectSubGenre!.id, item, this.currentSelectGenre!.id)
          .subscribe(
            (data: any) => {
              this.genreSubGenreService.editSubGenre(this.currentSelectGenre!.id,this.currentSelectSubGenre!.id,item)
            },
            (error) => this.message = error
          )
      }
    )

  }
  public deleteGenreOrSubGenre() {
    if (this.isGenreSelected) {
          this.deleteGenre()
    }
    if (this.isSubGenreSelected) {
     this.deleteSubGenre()
    }
  }
  private deleteGenre(){
    this.isGenreSelected =false
    const popup = this.dialog.open(ConfirmPopupComponent, {
      width: " 30%",
      enterAnimationDuration: 300,
      exitAnimationDuration: 300,
      data: {
        title: "Удаление",
        message: "Вы действительно хотите удалить жанр " + this.currentSelectGenre!.genreName +
          "? Все поджанры также будут удалены!"
      }
    })
    popup.afterClosed().subscribe(item => {
      if (item == "ok") {
        this.genreServices.deleteGenre(this.currentSelectGenre!.id).subscribe(
          (data: any) => {
              this.genreSubGenreService.removeGenreFromCollection(this.currentSelectGenre!.id)
              this.currentSelectGenre = undefined;
              this.isSubGenreSelected = false;
              this.isGenreSelected =false
              this.subGenreSelectList = []
          },
          (error) => console.log(error));
      }
    })
  }
  private deleteSubGenre(){
    const popup = this.dialog.open(ConfirmPopupComponent, {
      width: " 30%",
      enterAnimationDuration: 300,
      exitAnimationDuration: 300,
      data: {
        title: "Удаление",
        message: "Вы действительно хотите удалить поджанр " + this.currentSelectSubGenre!.subGenreName
      }
    })
    popup.afterClosed().subscribe(item => {
      if (item === "ok") {
        this.genreServices.deleteSubGenre(this.currentSelectSubGenre!.id).subscribe(
          (data: any) => {
            this.genreSubGenreService.removeSubGenreFromCollection(this.currentSelectGenre!.id,this.currentSelectSubGenre!.id)
            const index =   this.subGenreSelectList
                                    .findIndex((item)=> item.id === this.currentSelectSubGenre!.id)
            this.subGenreSelectList.splice(index,1)
            this.isSubGenreSelected =false;
            this.currentSelectSubGenre = undefined;
          },
          (error) => console.log(error));
      }
    })
  }
}
