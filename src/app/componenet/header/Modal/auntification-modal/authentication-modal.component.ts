import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ModalService} from "../../../../Servises/Modal/Modalservice";

@Component({
  selector: 'app-auth-modal',
  templateUrl: './authentication-modal.component.html',
  styleUrls: ['./authentication-modal.component.css']
})
export class AuthenticationModalComponent implements OnInit{
  closeResult: string;
  @ViewChild("mymodal") mymodal:ElementRef
  constructor(private modalService: NgbModal, private myModalService:ModalService) {
  }

  ngOnInit(): void {
        this.myModalService.openModal$.subscribe(()=>{this.open(this.mymodal)})
    }

  open(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
}
