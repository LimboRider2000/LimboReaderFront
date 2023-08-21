import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ModalService} from "../../../Servises/ModalService/Modalservice";
import {SingInService} from "../../../Servises/DataService/User/sin-in-srvice.service";
import {User} from "../../../model/User/User";
import {RegistrationServices} from "../../../Servises/DataService/User/RegistrationServisce";
import {RedirectService} from "../../../Servises/RedirectService/redirectService";
import {serverAddress} from '../../../Servises/DataService/ServerAddress';

@Component({
  selector: 'app-auth-modal',
  templateUrl: './authentication-modal.component.html',
  styleUrls: ['./authentication-modal.component.css']
})
export class AuthenticationModalComponent implements OnInit {
  closeResult: string;
  Login:string = "";
  Password:string ="";
  errorMessage : string = "";
  isAuntSuccess :boolean;
  isSendDisable: boolean = false;

  @ViewChild("myModal") myModal:ElementRef
  constructor(private modalService: NgbModal, private myModalService:ModalService,
              private signInService:SingInService,private registrationService:RegistrationServices,
              private redirectService: RedirectService) {}
  ngOnInit(): void {
        this.myModalService.openModal$.subscribe(()=>{this.open(this.myModal)})
    }
  open(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  AuthButtonClick()
  {
    this.isSendDisable = true;
    this.Login =  this.Login.trim();
    this.Password = this.Password.trim();

    if (this.Login.length === 0) {
      this.ErrorMessageShow('Введите логин')
      return
    }

    if (this.Password.length === 0) {
      this.ErrorMessageShow('Введите пароль')
      return
    }
    const errorMessageHTML = document.getElementById("error-message");
    if (!errorMessageHTML) throw 'Element "error-message" not found'
    this.signInService.SingInDataTooServer(this.Login, this.Password).subscribe(
      (data: any) =>{
        if(data.success){
          this.isAuntSuccess = true;
          errorMessageHTML.style.display = "block"
          this.errorMessage = "Успешно"
          this.MessageHide(errorMessageHTML,3000)
          this.WriteToStorage(data.currUser,data.avatarPath);
          this.modalService.dismissAll()
          this.isSendDisable =false;
        }else {
          if(data.notVerifi){
            sessionStorage.setItem("idRegisteredUser", data.id)
            this.redirectService.redirectToPageAfterDelay(2,"/confirmCode")
            return
          }

          this.isAuntSuccess = true;
          this.isAuntSuccess = false;
          errorMessageHTML.style.display = "block"
          if(data.notActive){
            this.errorMessage = "Ваш аккаунт не активный обратитесь к администрации сайта limboreader@gmail.com"
          }
          this.errorMessage = "Неправильный логин или пароль"
          this.MessageHide(errorMessageHTML,3000)
          this.isSendDisable =false;
        }},
      (error: any) =>{
        this.errorMessage = error.message
        errorMessageHTML.style.display = "block"
        this.MessageHide(errorMessageHTML,3000)
        this.isSendDisable =false;
      })}
  ErrorMessageShow(errorText:string) {
    const errorMessageHTML = document.getElementById("error-message");
    if (!errorMessageHTML) throw 'Element "error-message" not found'

    this.errorMessage = errorText;
    errorMessageHTML.style.display = "block"
    this.MessageHide(errorMessageHTML,3000)
  }
  MessageHide(htmlElement:HTMLElement, time:number){
    setTimeout(function(){
      htmlElement.style.display = "none"
    },time)
  }
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

}