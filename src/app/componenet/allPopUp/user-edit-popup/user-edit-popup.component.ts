import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {PopupComponent} from "../popup/popup.component";
import {UserService} from "../../../Servises/DataService/User/user.service";

@Component({
  selector: 'app-user-edit-popup',
  templateUrl: './user-edit-popup.component.html',
  styleUrls: ['./user-edit-popup.component.css']
})
export class UserEditPopupComponent {
  ngOnInit(): void {
    this.inputData = this.data.data;
    this.inputLogin = this.inputData.login
    this.inputMail = this.inputData.email
    this.inputName = this.inputData.name
    this.inputActive = this.inputData.active
    this.inputRole  = this.inputData.userRole
  }
  constructor(@Inject(MAT_DIALOG_DATA) public data:any,  private ref:MatDialogRef<PopupComponent>,private userService:UserService) {

  }
   inputData:any
   inputLogin:string
   inputName:string
   inputMail:string
   inputActive:boolean;
   inputRole:string;
   isMailChange: boolean = false;
   message?:string
  editData(){
    this.message = this.validationData()
      if(this.message) return
    if(this.inputLogin !== this.inputData.login)
      this.inputData.login = this.inputLogin
    if( this.inputName !== this.inputData.name)
      this.inputData.name = this.inputName
    if(this.inputRole  !== this.inputData.userRole)
      this.inputData.userRole = this.inputRole

    if(this.inputData.email!== this.inputMail) {
      this.isMailChange = true
      this.inputData.email = this.inputMail
      this.inputData.active =false
    }

    if(!this.isMailChange)
      if(this.inputActive !== this.inputData.active)
        this.inputData.active = this.inputActive

    this.ref.close(this.inputData);
  }

  private validationData() {
    if(this.inputData.login !== this.inputLogin)
       return  this.userService.checkLogin(this.inputLogin)
    if(this.inputData.email !== this.inputMail)
      return  this.userService.checkMail(this.inputMail)
        return undefined
  }


  roleEdit()   {
    this.inputRole = this.inputRole == "User" ? "Admin" :"User"
  }
}
