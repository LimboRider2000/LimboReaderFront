import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ModalService} from "../../../../Servises/Modal/Modalservice";
import {SingInService} from "../../../../Servises/DataService/User/sin-in-srvice.service";
import {User} from "../../../../model/User";

@Component({
  selector: 'app-auth-modal',
  templateUrl: './authentication-modal.component.html',
  styleUrls: ['./authentication-modal.component.css']
})
export class AuthenticationModalComponent implements OnInit {
  closeResult: string;
  Login:string = "";
  Password:string ="";
  errorMessage : string;
  isAuntSuccess :boolean;
  isSendDesable: boolean = false;

  @ViewChild("mymodal") mymodal:ElementRef
  constructor(private modalService: NgbModal, private myModalService:ModalService, private signInService:SingInService) {}
  ngOnInit(): void {
        this.myModalService.openModal$.subscribe(()=>{this.open(this.mymodal)})
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
    this.isSendDesable = true;
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

        if(data.success === true ){
          this.isAuntSuccess = true;
          errorMessageHTML.style.display = "block"
          this.errorMessage = "Успешно"
          this.MessageHide(errorMessageHTML,3000)
          this.WriteToStorage(data.currUser);
          this.modalService.dismissAll()
          this.isSendDesable =false;
        }else {
          this.isAuntSuccess = true;
          this.isAuntSuccess = false;
          errorMessageHTML.style.display = "block"
          this.errorMessage = "Неправильный логин или пароль"
          this.MessageHide(errorMessageHTML,3000)
          this.isSendDesable =false;
        }},
      (error: any) =>{
        this.errorMessage = error.message
        errorMessageHTML.style.display = "block"
        this.MessageHide(errorMessageHTML,3000)
        this.isSendDesable =false;
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
  private WriteToStorage(user:User){

    if(user.name != null){
      localStorage.setItem("Name", user.name)
      sessionStorage.setItem("Name", user.name)
    }
    if(user.avatar != null){
      localStorage.setItem("Avatar", user.avatarPath)
      sessionStorage.setItem("Avatar", user.avatarPath)
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
