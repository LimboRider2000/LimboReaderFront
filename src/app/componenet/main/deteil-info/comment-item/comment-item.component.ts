import {Component, inject, Input, OnInit} from '@angular/core';
import {Comment} from "../../../../model/Comment";
import {FormatDataStringService} from "../../../../Servises/format-data-string.service";
import {CommentService} from "../../../../Servises/DataService/comment.service";
import {User} from "../../../../model/User/User";

@Component({
  selector: 'app-comment-item',
  templateUrl: './comment-item.component.html',
  styleUrls: ['./comment-item.component.css']
})
export class CommentItemComponent implements OnInit{

  @Input() comment:Comment;
  dateSer = inject(FormatDataStringService)
  commentService = inject(CommentService)
  user:User|null;

  deleteComment() {
    this.commentService.deleteComment(this.comment.id)
  }

  ngOnInit(): void {
    if(sessionStorage.getItem("user")!= null)
    this.user = JSON.parse(sessionStorage.getItem("user")!)
  }

}
