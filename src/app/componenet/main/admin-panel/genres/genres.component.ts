import {Component, Input, OnInit} from '@angular/core';
import {Genre} from "../../../../model/Genres/Genre";
import {GenreServices} from "../../../../Servises/DataService/GenreServices/GenreServices";
import {GenreSubgenreItem} from "../../../../model/Genres/GenreSubgenreItem";
import {SubGenre} from "../../../../model/Genres/SubGenre";
import {MatDialog} from "@angular/material/dialog";
import {PopupComponent} from "../../../allPopUp/popup/popup.component";
import {ConfirmPopupComponent} from "../../../allPopUp/comform-popup/confirm-popup.component";

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
  @Input() genreSelectList: Genre[] = [];
  @Input() subGenreSelectList: SubGenre[] = [];
  @Input() collectionGenreSubGenre: GenreSubgenreItem[] = []
  private currentSelectGenre: Genre|null = new Genre();
  private currentSelectSubGenre: SubGenre|null = new SubGenre();

  ngOnInit(): void {
    this.genreServices.getInitialDate().subscribe(
      (data: any) => {
        for (const item of data) {
          const currGenre: Genre = new Genre()
          currGenre.id = item.genre.id;
          currGenre.genreName = item.genre.genreName;
          this.genreSelectList.push(currGenre);

          const genreSubGenre = new GenreSubgenreItem();
          genreSubGenre.genre = item.genre;
          if (item.subGenreList !== null && item.subGenreList.length > 0)
            genreSubGenre.subGenreCollection = item.subGenreList
          this.collectionGenreSubGenre.push(genreSubGenre)
        }
      }
    )
  }

  constructor(private genreServices: GenreServices, private dialog: MatDialog) {
  }

  public SelectGenre(event: any) {
    this.isSubGenreSelected = false;
    this.isGenreSelected = true;
    if(this.currentSelectGenre === null)return
    this.currentSelectGenre.id = event.currentTarget.value
    this.currentSelectGenre.genreName = event.currentTarget[event.currentTarget.selectedIndex].text
    this.currentSelectGenre.genreName
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
    if (event.currentTarget){
      if(this.currentSelectSubGenre === null ) return
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
    this.genreServices.postGenre(this.genre).subscribe(
      (data: any) => {
        let newGenre = new Genre;
        newGenre.id = data.id;
        newGenre.genreName = data.genreName;
        this.genreSelectList.push(newGenre)
        this.genre = "";
      },
      (error) => {
        this.message = error.message
      }
    )
    //TO DO: добавить функцию подключения к серверу и передать название жанра
    //вернуть объект genre;


  }

  public addSubGenre() {
    if (this.currentSelectSubGenre == null) return;

    if(this.currentSelectGenre === null) return;
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
        this.subGenre = ""
      },
      error => {
        console.log(error)
        this.message = error.error
      }
    )

  }

  public changeGenre(event: any) {
    if(this.currentSelectGenre === null) return
    const popupData = this.dialog.open(PopupComponent, {
      width: " 30%",
      enterAnimationDuration: 300,
      exitAnimationDuration: 300,
      data: {
        title: "Редактировать жанр",
        selectedGenre: this.currentSelectGenre.genreName
      }
    });
    popupData.afterClosed().subscribe(item => {
      if (item === "" || item === undefined) return

      if(this.currentSelectGenre === null) return

      this.genreServices.editGenre(item, this.currentSelectGenre.id).subscribe(
        (data: any) => {
          for (const genre of this.genreSelectList) {
            if(this.currentSelectGenre === null) return
            if (genre.id === this.currentSelectGenre.id)
              genre.genreName = item;
          }
        },
        (error) => this.message = error
      )
    })
  }

  public changeSubGenre(event: any) {
    if(this.currentSelectSubGenre === null) return
    const subGenreSelectObject = document.getElementById("subGenre")
    if (subGenreSelectObject)
      subGenreSelectObject.querySelectorAll("option[selected]")
        .forEach(option => option.removeAttribute("selected"));
    const popupData = this.dialog.open(PopupComponent, {
      width: " 30%",
      enterAnimationDuration: 300,
      exitAnimationDuration: 300,
      data: {
        title: "Редактировать поджанр",
        selectedGenre: this.currentSelectSubGenre.subGenreName
      }
    });
    popupData.afterClosed().subscribe(item => {
        if (item === "" || item === undefined) return

      if(this.currentSelectSubGenre === null || this.currentSelectGenre === null) return
        this.genreServices.editSubGenre(this.currentSelectSubGenre.id, item, this.currentSelectGenre.id)
          .subscribe(
            (data: any) => {
              for (const SubGenre of this.subGenreSelectList) {
                if(this.currentSelectSubGenre === null) return
                if (SubGenre.id === this.currentSelectSubGenre.id) {
                  SubGenre.subGenreName = item;
                  return;
                }
              }
              for (const datum of this.collectionGenreSubGenre) {
                    if(this.currentSelectGenre === null) return
                if (datum.genre.id === this.currentSelectGenre.id) {
                  for (const datumElement of datum.subGenreCollection) {
                    if(this.currentSelectSubGenre === null) return
                    if (datumElement.id === this.currentSelectSubGenre.id) {
                      datumElement.subGenreName = item;
                      return;
                    }
                  }
                }
              }
            },
            (error) => this.message = error
          )
      }
    )

  }

  public deleteGenreOrSubGenre() {
    if(this.isGenreSelected) {
      if(this.currentSelectGenre === null) return
      const popup = this.dialog.open(ConfirmPopupComponent, {
        width: " 30%",
        enterAnimationDuration: 300,
        exitAnimationDuration: 300,
        data: {
          title: "Удаление",
          message: "Вы действительно хотите удалить жанр " + this.currentSelectGenre.genreName +
            "? Все поджанры также будут удалены!"
        }
      })
      popup.afterClosed().subscribe(item => {
        if (item == "ok") {
          this.genreServices.deleteGenre(this.currentSelectGenre!.id).subscribe(
            (data:any)=> {},
            (error)=> console.log(error));
          if (this.isGenreSelected) {
            for (let i = 0; i < this.genreSelectList.length; i++) {
              if(this.currentSelectGenre === null) return
              if (this.currentSelectGenre.id == this.genreSelectList[i].id) {
                this.genreSelectList.splice(i, 1)
                this.subGenreSelectList = [];
              }
            }
            for (let i = 0; i < this.collectionGenreSubGenre.length; i++) {
              if(this.currentSelectGenre === null) return
              if (this.currentSelectGenre.id == this.collectionGenreSubGenre[i].genre.id) {
                this.collectionGenreSubGenre.splice(i, 1)
              }
            }
            this.currentSelectGenre = null;
          }
        }
      })

    }
    if (this.isSubGenreSelected) {
      if(this.currentSelectSubGenre === null) return
      const popup = this.dialog.open(ConfirmPopupComponent, {
        width: " 30%",
        enterAnimationDuration: 300,
        exitAnimationDuration: 300,
        data: {
          title: "Удаление",
          message: "Вы действительно хотите удалить поджанр " + this.currentSelectSubGenre.subGenreName
        }
      })
      popup.afterClosed().subscribe(item => {
        if(item ==="ok") {
          this.genreServices.deleteSubGenre(this.currentSelectSubGenre!.id).subscribe(
            (data:any)=> {},
            (error)=> console.log(error));

          if(this.currentSelectSubGenre === null) return
          for (let i = 0; i < this.subGenreSelectList.length; i++) {
            if (this.currentSelectSubGenre.id == this.subGenreSelectList[i].id) {
              this.subGenreSelectList.splice(i, 1)
            }
          }
          const tempSubGenreCollection: SubGenre[] = []
          for (let i = 0; i < this.collectionGenreSubGenre.length; i++) {
            if(this.currentSelectGenre === null) return;
            if (this.currentSelectGenre.id == this.collectionGenreSubGenre[i].genre.id) {
              this.collectionGenreSubGenre[i].subGenreCollection.forEach(item => {
                if(this.currentSelectSubGenre === null) return
                if (item.id !== this.currentSelectSubGenre.id)
                  tempSubGenreCollection.push(item);
              })
              this.collectionGenreSubGenre[i].subGenreCollection = [];
              tempSubGenreCollection.forEach(item => this.collectionGenreSubGenre[i].subGenreCollection.push(item))
            }
          }
        }
      })

    }

//ToDo пофиксить баг с старим названием

  }
}
