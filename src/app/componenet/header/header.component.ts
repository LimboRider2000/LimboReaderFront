import {Component, Input, OnInit} from '@angular/core';
import {ModalService} from "../../Servises/ModalService/Modalservice";
import {User} from "../../model/User/User";
import {Router} from "@angular/router";
import {BookPostService} from "../../Servises/DataService/Book-post/book-post.service";

@Component({
  selector: 'app-headerTop',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  constructor(private modalService: ModalService,private routh:Router, private bookService:BookPostService ) {
  }
  ngOnInit() {
    if(localStorage.getItem("Login")!= null){
      sessionStorage.setItem("Login", localStorage.getItem("Login")!)
      if(localStorage.getItem("Avatar") !== null|| true){
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

  @Input() bookCount$ = this.bookService.getGlobalBookCountObservable();
  @Input() performerCount: number =0;
  @Input() userCount: number=0;



  Exit(){
    sessionStorage.clear();
    localStorage.clear();
    this.routh.navigateByUrl("")
  }
  protected readonly sessionStorage = sessionStorage;
}
