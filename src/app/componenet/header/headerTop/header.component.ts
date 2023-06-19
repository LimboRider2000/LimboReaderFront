import {Component, Input, OnInit} from '@angular/core';
import {ModalService} from "../../../Servises/Modal/Modalservice";

@Component({
  selector: 'app-headerTop',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  constructor(private modalService: ModalService) { }
  ngOnInit() {
  }
  callOpenModal(){
    this.modalService.openModal();
  }

  @Input() bookCount: number = 0;
  @Input() performerCount: number =0;
  @Input() userCount: number=0;
}
