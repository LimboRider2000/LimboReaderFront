import {Component, inject, Input} from '@angular/core';
import {Comment} from "../../../../../model/Comment";
import {FormatDataStringService} from "../../../../../Servises/format-data-string.service";
import {CommentService} from "../../../../../Servises/DataService/comment.service";

@Component({
  selector: 'app-comment-item',
  templateUrl: './comment-item.component.html',
  styleUrls: ['./comment-item.component.css']
})
export class CommentItemComponent {

  @Input() comment:Comment;
  dateSer = inject(FormatDataStringService)
  commentService = inject(CommentService)
  protected readonly localStorage = localStorage;

  deleteComment() {
    this.commentService.deleteComment(this.comment.id)
  }
}
