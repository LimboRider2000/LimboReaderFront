import {Component, inject, Input} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CommentService} from "../../../../../Servises/DataService/comment.service";

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.css']
})
export class CommentFormComponent {
 @Input() bookId:string;
 commentForm :FormGroup;
private commentService = inject(CommentService)
  constructor(private fb:FormBuilder) {
    this.commentForm = this.fb.group({
      comment:["",[Validators.required,Validators.minLength(3)]]
    })
  }

  protected readonly event = event;

  Submit($event: Event) {
    const formData:FormData = new FormData();
    const user_id= localStorage.getItem("Id")
    if(user_id){
    formData.append('user_id',user_id )
    formData.append("comment",this.commentForm.controls["comment"].value)
    formData.append("book_id",this.bookId)
    this.commentService.addComment(formData);
    }
  }
}
