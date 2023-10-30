import {Component, inject, OnInit} from '@angular/core';
import {UnreadBookCollection} from "../../../../model/Book/UnreadBookCollection";
import {User} from "../../../../model/User/User";
import {MatTableDataSource} from "@angular/material/table";
import {UnreadBook} from "../../../../model/Book/UnreadBook";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmPopupComponent} from "../../../allPopUp/comform-popup/confirm-popup.component";

@Component({
  selector: 'app-for-read',
  templateUrl: './for-read.component.html',
  styleUrls: ['./for-read.component.css']
})
export class ForReadComponent implements OnInit{
  private route = inject(Router)
  private modal = inject(MatDialog);
  unreadBookCollection:UnreadBookCollection;
  private user:User;
  dataSource:any;
  displayedColumns: string[] = ['tittle', 'author','action'];

  ngOnInit(): void {
    this.user = JSON.parse(sessionStorage.getItem("user")!)
    if(sessionStorage.getItem("user") != null && localStorage.getItem("UnreadBook" + this.user.id)!= null) {
      this.unreadBookCollection = JSON.parse(localStorage.getItem("UnreadBook" + this.user.id)!)
      this.dataSource = new MatTableDataSource<UnreadBook>(this.unreadBookCollection.collection)
    }

  }
  userEdit(unreadBook: UnreadBook) {
       this.route.navigateByUrl("/reader",
                 {
                   state:
                     {
                       path: unreadBook.path,
                       title: unreadBook.tittle,
                       author: unreadBook.author,
                       id: unreadBook.bookId,
        }})
  }
  delete(unreadBook: UnreadBook ) {
        const temp =  this.modal.open(ConfirmPopupComponent, {
           width: "30%",
           enterAnimationDuration: 100,
           exitAnimationDuration: 300,
           data: {
             title: "Удаление",
             message: "Вы действительно хотите  удалить из списка " + unreadBook.tittle,
             buttonAction: "Удалить"
           }
         });

    temp.afterClosed().subscribe(
      {
        next:(data:string)=>{
          if(data === "ok") {
            this.unreadBookCollection.collection = this.unreadBookCollection.collection
              .filter(ub => ub.bookId != unreadBook.bookId);
            localStorage.setItem("UnreadBook" + this.user.id, JSON.stringify(this.unreadBookCollection));
            this.dataSource = new MatTableDataSource<UnreadBook>(this.unreadBookCollection.collection)
          }}})
  }
}
