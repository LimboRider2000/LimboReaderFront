import {Component, Input} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {RegistrationServices} from "../../../../Servises/DataService/User/RegistrationServisce";

@Component({
  selector: 'app-confirm-page',
  templateUrl: './confirm-page.component.html',
  styleUrls: ['./confirm-page.component.css']
})
export class ConfirmPageComponent {
  constructor(private registrationService:RegistrationServices) {
}
@Input()message:string;
@Input()isSuccess:boolean;
  onCodeCompleted(code: string) {
   const id = sessionStorage.getItem("idRegisteredUser")

    if(id !== null) {
      this.registrationService.CodeCheck(code,id).subscribe(
        (data:any)=>{
          if(data.success){
            this.isSuccess = true;
            this.message = "Верификация прошла успешно пожалуйста авторизуйтесь на сайте"
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
