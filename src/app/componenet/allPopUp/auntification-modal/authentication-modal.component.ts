import {Component, inject, Inject, OnInit} from '@angular/core';
import {ModalService} from "../../../Servises/ModalService/Modalservice";
import {SingInService} from "../../../Servises/DataService/User/sin-in-srvice.service";
import {User} from "../../../model/User/User";
import {RegistrationServices} from "../../../Servises/DataService/User/RegistrationServisce";
import {RedirectService} from "../../../Servises/RedirectService/redirectService";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {serverAddress} from "../../../Servises/DataService/ServerAddress";
import {AuthenticationUserService} from "../../../Servises/authentication-user.service";

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
  private auntUserService = inject(AuthenticationUserService)
  ngOnInit(): void {
    this.dialogData = this.data
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
          this.WriteToStorage(data.currUser);
          this.Close();
          this.isSendDisable =false;
        }else {
          if(data.notVerifi){
            sessionStorage.setItem("idRegisteredUser", data.id)
            this.redirectService.redirectToPageAfterDelay(2,"/confirmCode")
            this.Close()
          }
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

  private WriteToStorage(user:User){
    if(user.avatar ==null){
      user.avatar = "../assets/img/img_avatar.png"
    }else {
      user.avatar = serverAddress+user.avatar
    }

    const userJson =JSON.stringify(user);
    this.auntUserService.setUser(user);
    localStorage.setItem("user",userJson )
    sessionStorage.setItem("user",userJson)
  }


  Close() {
    this.Login =""
    this.Password =""
    this.errorMessage = ""
    this.ref.close()
  }


}
