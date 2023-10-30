import {Component, inject, OnInit} from '@angular/core';
import {User} from "../../../model/User/User";
import {AuthenticationUserService} from "../../../Servises/authentication-user.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit{
  private auntService = inject(AuthenticationUserService)
  user:User|null;
  user$:Observable<User|null> = this.auntService.getUserObservable();

  ngOnInit(): void {
    this.user$.subscribe({
      next:data=>this.user = data
    })
  }


}
