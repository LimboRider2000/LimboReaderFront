import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit{
  ngOnInit(): void {
    this.inputData = this.data;
    this.inputString = this.inputData.selectedGenre;
  }
  constructor(@Inject(MAT_DIALOG_DATA) public data:any,  private ref:MatDialogRef<PopupComponent>) {

  }
  inputData:any
  inputString :string;

  editData(){
    this.ref.close(this.inputString);
  }




}
