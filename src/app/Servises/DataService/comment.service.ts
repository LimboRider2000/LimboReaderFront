import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {serverAddress} from "./ServerAddress";
import {Comment} from "../../model/Comment";
import {BehaviorSubject, connect} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private endpoint = serverAddress+"api/comment"
  private commentsCollection:Comment[] = []
  private commentsCollectionObserver : BehaviorSubject<Comment[]> = new BehaviorSubject<Comment[]>(this.commentsCollection)
  constructor(private http:HttpClient) {
  }
  getCollectionAsObserver(){
      return this.commentsCollectionObserver.asObservable()
  }
  initCommentCollection(book_id:string){
    this.http.get<Comment[]>(this.endpoint+"/?book_id="+book_id).subscribe(
      (data:Comment[])=>{
          this.commentsCollection = []
          data.forEach(item=> this.commentsCollection.push(item))
          this.commentsCollectionObserver.next(this.commentsCollection.slice())
      },
      error => console.error(error.error)
    )
  }

  addComment(formData: FormData) {
    this.http.post<Comment>(this.endpoint,formData).subscribe(
      (data:Comment)=>{
        this.commentsCollection.push(data)
        this.commentsCollectionObserver.next(this.commentsCollection.slice())
      },
    (error)=> console.error( error.error)
    )
  }

  Destroy() {
    this.commentsCollection= [];
    this.commentsCollectionObserver.next(this.commentsCollection.slice())
  }

  deleteComment(id: string) {
    this.http.delete(this.endpoint+"/"+id).subscribe(
      (data)=>
      {
        this.commentsCollection = this.commentsCollection.filter(item=>item.id !== id)
        this.commentsCollectionObserver.next(this.commentsCollection.slice())
      },
      error =>  console.error(error.error)
    )
  }
}
