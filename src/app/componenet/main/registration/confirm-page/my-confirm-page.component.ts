import {Component, Input} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {RegistrationServices} from "../../../../Servises/DataService/User/RegistrationServisce";
import {Router} from "@angular/router";
import {RedirectService} from "../../../../Servises/RedirectService/redirectService";

@Component({
  selector: 'app-confirm-page',
  templateUrl: './my-confirm-page.component.html',
  styleUrls: ['./my-confirm-page.component.css']
})
export class MyConfirmPageComponent {
  constructor(private registrationService:RegistrationServices,private redirectService: RedirectService) {}
@Input()message:string = "";
@Input()isSuccess:boolean;
  onCodeCompleted(code: string) {

   let id = sessionStorage.getItem("idRegisteredUser")
    sessionStorage.removeItem("idRegisteredUser");
    if(id !== null) {
      this.registrationService.CodeCheck(code,id).subscribe(
        (data:any)=>{
          if(data.success){
            this.isSuccess = true;
            this.message = "Верификация прошла успешно пожалуйста авторизуйтесь на сайте"
            this.redirectService.redirectToPageAfterDelay(5,"")
          }else{
            this.isSuccess = false;
            this.message = data.message
          }
        },
        error => {
          this.isSuccess = false
          this.message = error;
        }
      )
    }
  }
}
