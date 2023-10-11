import {Component,  Inject, OnInit} from '@angular/core';
import {ModalService} from "../../../Servises/ModalService/Modalservice";
import {SingInService} from "../../../Servises/DataService/User/sin-in-srvice.service";
import {User} from "../../../model/User/User";
import {RegistrationServices} from "../../../Servises/DataService/User/RegistrationServisce";
import {RedirectService} from "../../../Servises/RedirectService/redirectService";
import {serverAddress} from '../../../Servises/DataService/ServerAddress';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-auth-modal',
  templateUrl: './authentication-modal.component.html',
  styleUrls: ['./authentication-modal.component.css']
})
export class AuthenticationModalComponent implements OnInit{
  private dialogData :any;
  Login:string = "";
  Password:string ="";
  errorMessage : string = "";
  isAuntSuccess :boolean;
  isSendDisable: boolean = false;
  ngOnInit(): void { this.dialogData = this.data
  }
  constructor(private myModalService:ModalService,
              private signInService:SingInService,private registrationService:RegistrationServices,
              private redirectService: RedirectService,
              @Inject(MAT_DIALOG_DATA) public data:any,
              private ref:MatDialogRef<AuthenticationModalComponent>
  ) {}

  AuthButtonClick()
  {
    this.isSendDisable = true;
    this.Login =  this.Login.trim();
    this.Password = this.Password.trim();

    if (this.Login.length === 0) {
      this.errorMessage  ='Введите логин'
      this.isSendDisable = false;
      return
    }

    if (this.Password.length === 0) {
      this.errorMessage = 'Введите пароль'
      this.isSendDisable = false
      return
    }


    this.signInService.SingInDataTooServer(this.Login, this.Password).subscribe(
      (data: any) =>{
        if(data.success){
          this.isAuntSuccess = true;
          this.errorMessage = "Успешно"
          this.WriteToStorage(data.currUser,data.avatarPath);
          this.Close();
          this.isSendDisable =false;
        }else {
          if(data.notVerifi){
            sessionStorage.setItem("id", data.id)
            this.redirectService.redirectToPageAfterDelay(2,"/confirmCode")
            return
          }

          this.isAuntSuccess = true;
          this.isAuntSuccess = false;
          if(data.notActive){
            this.errorMessage = "Ваш аккаунт не активный обратитесь к администрации сайта limboreader@gmail.com"
          }
          this.errorMessage =  "Неправильный логин или пароль"
          this.isSendDisable =false;
        }},
      (error: any) =>{
        console.error(error.error)
        this.isSendDisable =false;
      })}

  private WriteToStorage(user:User,avatarPath:string ){

    if(user.name != null){
      localStorage.setItem("Name", user.name)
      sessionStorage.setItem("Name", user.name)
    }
    if(avatarPath !== null){
      localStorage.setItem("Avatar",serverAddress+avatarPath)
      sessionStorage.setItem("Avatar", serverAddress+avatarPath)
    }else{
      sessionStorage.setItem("Avatar","../assets/img/img_avatar.png")
    }
    localStorage.setItem("Email",user.email)
    localStorage.setItem("Login",user.login)
    localStorage.setItem("Id",user.id)
    localStorage.setItem("UserRole",user.userRole)
    sessionStorage.setItem("Email",user.email)
    sessionStorage.setItem("Login",user.login)
    sessionStorage.setItem("Id",user.id)
    sessionStorage.setItem("UserRole",user.userRole)
  }


  Close() {
    this.Login =""
    this.Password =""
    this.errorMessage = ""
    this.ref.close()
  }


}
