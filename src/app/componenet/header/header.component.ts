import {Component, inject, Input, OnInit} from '@angular/core';
import {ModalService} from "../../Servises/ModalService/Modalservice";
import {User} from "../../model/User/User";
import {Router} from "@angular/router";
import {BookPostService} from "../../Servises/DataService/Book-post/book-post.service";
import {MatDialog} from "@angular/material/dialog";
import {AuthenticationModalComponent} from "../allPopUp/auntification-modal/authentication-modal.component";


@Component({
  selector: 'app-headerTop',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  public auntDialog = inject(MatDialog)
  constructor(private modalService: ModalService,private routh:Router, private bookService:BookPostService ) {
  }
  ngOnInit() {
    if(localStorage.getItem("Id")!= null){
      sessionStorage.setItem("Login", localStorage.getItem("Login")!)
      sessionStorage.setItem("id", localStorage.getItem("Id")!)
      if(localStorage.getItem("Avatar") !== null|| true){
        sessionStorage.setItem("Avatar",localStorage.getItem('Avatar')!)
      }else {
        sessionStorage.setItem("Avatar","../assets/img/img_avatar.png")
      }
    }
  }
  callOpenModal(){
   this.auntDialog.open(AuthenticationModalComponent, {
      width: "30%",
      enterAnimationDuration: 300,
      exitAnimationDuration: 300,
      data : {
        title: "Авторизация"
      }
    });
  }
  @Input() user:User;

  @Input() bookCount$ = this.bookService.getGlobalBookCountObservable();
  @Input() performerCount: number =0;
  @Input() userCount: number=0;



  Exit(){
    sessionStorage.clear();
    this.routh.navigateByUrl("")
  }
  protected readonly sessionStorage = sessionStorage;
}
