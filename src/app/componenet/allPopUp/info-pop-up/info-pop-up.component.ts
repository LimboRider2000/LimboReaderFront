import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-info-pop-up',
  templateUrl: './info-pop-up.component.html',
  styleUrls: ['./info-pop-up.component.css']
})
export class InfoPopUpComponent implements OnInit{
  ngOnInit(): void {
    this.inputData = this.data;
    this.inputString = this.inputData.message;
  }
  constructor(@Inject(MAT_DIALOG_DATA) public data:any,  private ref:MatDialogRef<InfoPopUpComponent>) {

  }
  inputData:any
  inputString :string;
}
