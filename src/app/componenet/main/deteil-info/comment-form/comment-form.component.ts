import {Component, ElementRef, inject, Input, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CommentService} from "../../../../Servises/DataService/comment.service";
import {User} from "../../../../model/User/User";
import {Observable} from "rxjs";
import {AuthenticationUserService} from "../../../../Servises/authentication-user.service";
import {Book} from "../../../../model/Book/Book";

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.css']
})
export class CommentFormComponent {
  @ViewChild("btnSend") btnSend :ElementRef<HTMLButtonElement>
 @Input() bookId:string;
 commentForm :FormGroup;
private commentService = inject(CommentService)
  private auntService = inject(AuthenticationUserService)
  user:User|null;
  user$:Observable<User|null> = this.auntService.getUserObservable();
  constructor(private fb:FormBuilder) {
    this.user$.subscribe({
      next:data=>this.user = data
    })
    this.commentForm = this.fb.group({
      comment:["",[Validators.required,Validators.minLength(3)]]
    })
  }

  protected readonly event = event;

  Submit() {
    this.btnSend.nativeElement.disabled = true;
    const formData:FormData = new FormData();
    if(sessionStorage.getItem("user")!= null) {
      const user:Book = JSON.parse(sessionStorage.getItem("user")!);
      if (user.id) {
        formData.append('user_id', user.id)
        formData.append("comment", this.commentForm.controls["comment"].value)
        formData.append("book_id", this.bookId)
        this.commentService.addComment(formData);
        this.commentForm.controls["comment"].setValue("");
        this.btnSend.nativeElement.disabled = false;
      }
    }

  }
}
