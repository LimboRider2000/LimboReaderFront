import {Component, inject, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {UserService} from "../../../../Servises/DataService/User/user.service";
import {UserFullModel} from "../../../../model/User/userFullModel";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatDialog} from "@angular/material/dialog";
import {UserEditPopupComponent} from "../../../allPopUp/user-edit-popup/user-edit-popup.component";
import {Observable} from "rxjs";
import {FormatDataStringService} from "../../../../Servises/format-data-string.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  private userService = inject(UserService)

  dataSource: any;
  displayedColumns: string[] = ['login', 'name', 'email', 'userRole', 'Active', 'RegisterDt', 'LastLoginDt', 'action'];
  userCollection: UserFullModel[];

  @ViewChild(MatPaginator) paginator! : MatPaginator
  @ViewChild(MatSort) sort! : MatSort


  private dialog = inject(MatDialog)
  public dateService = inject(FormatDataStringService)

  ngOnInit(): void {
    this.getAllUser()

  }

  getAllUser() {
    this.userService.GetUserAll().then(
      (observable: Observable<UserFullModel[]>) => {
        observable.subscribe(
          result => {
            if (result.length > 0) {
              this.userCollection = result
              this.dataSource = new MatTableDataSource<UserFullModel>(this.userCollection)
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
            }
          }
        )
      }
    )
  }


  filterChange($event: KeyboardEvent) {
    this.dataSource.filter = ($event.target as HTMLInputElement).value;

  }

  userEdit(row: any) {
    const popupData = this.dialog.open(UserEditPopupComponent, {
      width: "30%",
      enterAnimationDuration: 300,
      exitAnimationDuration: 300,
      data: {
        title: "Редактировать Пользователя",
        data: row
      }
    });
    popupData.afterClosed().subscribe(
      (data: any) => {
        if(data !== undefined)
          this.userService.editUser(data)
      }
    )
  }

}
