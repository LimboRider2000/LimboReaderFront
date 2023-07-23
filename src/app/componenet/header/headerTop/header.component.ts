import {Component, Input, OnInit} from '@angular/core';
import {ModalService} from "../../../Servises/Modal/Modalservice";
import {User} from "../../../model/User";

@Component({
  selector: 'app-headerTop',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  constructor(private modalService: ModalService) { }
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
  }
  protected readonly sessionStorage = sessionStorage;
}
