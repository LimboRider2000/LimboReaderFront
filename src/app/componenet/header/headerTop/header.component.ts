import {Component, Input, OnInit} from '@angular/core';
import {ModalService} from "../../allPopUp/Modal/Modalservice";
import {User} from "../../../model/User";
import {Router} from "@angular/router";

@Component({
  selector: 'app-headerTop',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  constructor(private modalService: ModalService,private routh:Router) { }
  ngOnInit() {

    if(localStorage.getItem("Login")!= null){
      sessionStorage.setItem("Login", localStorage.getItem("Login")!)
      if(localStorage.getItem("Avatar") != null){
        sessionStorage.setItem("Avatar",localStorage.getItem('Avatar')!)
      }else {
        sessionStorage.setItem("Avatar","../assets/img/img_avatar.png")
      }
    }

  }
  callOpenModal(){
    this.modalService.openModal();
  }
  @Input() user:User;

  @Input() bookCount: number = 0;
  @Input() performerCount: number =0;
  @Input() userCount: number=0;


  //protected readonly sessionStorage = sessionStorage;
  //protected readonly localStorage = localStorage;
  Exit(){
    sessionStorage.clear();
    localStorage.clear();
    this.routh.navigateByUrl("")
  }
  protected readonly sessionStorage = sessionStorage;
}
