import {Component, Input} from '@angular/core';
import {User} from "../../../model/User";
import {Router} from "@angular/router";
import {SingInService} from "../../../Servises/DataService/User/sin-in-srvice.service";


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  @Input() user:User= new User();
  @Input() errorMessage : string;
  @Input() error: boolean = false;

  constructor() {
  }
  // Authorization() {
  //   this.error= false;
  //   this.http.AuthUser(this.user).subscribe(
  //     (data:User)=>{
  //       console.log(data)
  //       this.http.initUser(data);
  //       this.router.navigateByUrl("")
  //     },
  //     error=>{
  //       this.error = true;
  //       this.errorMessage = error.error.detail;
  //     })
  // }
}
