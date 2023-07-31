import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-confirm-popup',
  templateUrl: './confirm-popup.component.html',
  styleUrls: ['./confirm-popup.component.css']
})
export class ConfirmPopupComponent implements OnInit{
  inputData: any;

  ngOnInit(): void {
    this.inputData = this.data;
  }
  constructor(@Inject(MAT_DIALOG_DATA) public data:any,  private ref:MatDialogRef<ConfirmPopupComponent>) {
  }
  deleteData() {
    this.ref.close("ok")
  }


}
