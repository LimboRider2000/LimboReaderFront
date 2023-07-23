import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-my-button',
  templateUrl: './my-button.component.html',
  styleUrls: ['./my-button.component.css']
})
export class MyButtonComponent {
@Input() Text:string;
@Input() btnColor:string;
@Output() btnClick  = new EventEmitter()
OnClick(){
  this.btnClick.emit()
}
}
