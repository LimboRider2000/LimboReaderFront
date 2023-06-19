import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-headerTop',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  constructor() { }
  ngOnInit() {
  }
OpenModal(){
    const modalDiv= document.getElementById("authModal")
  if(modalDiv != null){
      modalDiv.style.display = "block"
  }
}


  @Input() bookCount: number = 0;
  @Input() performerCount: number =0;
  @Input() userCount: number=0;
}
