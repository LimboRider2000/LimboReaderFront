import { Injectable } from '@angular/core';
import {User} from "../model/User/User";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationUserService {
user:User|null = null;
UserObservable : BehaviorSubject<User|null> = new BehaviorSubject<User|null>(this.user);
  constructor() { }

  getUserObservable(){
    return this.UserObservable.asObservable();
  }
  setUser(user:User|null){
    this.user = user;
    this.UserObservable.next(this.user);
  }
}
