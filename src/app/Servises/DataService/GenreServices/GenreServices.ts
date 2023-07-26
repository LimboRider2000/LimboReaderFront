import {Injectable} from "@angular/core";
import {serverAddress} from "../ServerAddress";
import {HttpClient} from "@angular/common/http";
import {Observable, Subscription} from "rxjs";

@Injectable()
export class GenreServices {
  urlServer:string = serverAddress + "api/Genre";
  constructor(private http: HttpClient) { }
 postGenre(genreName:string):Observable<Object>{
    return  this.http.get(this.urlServer +"?genreName="+ genreName).pipe()
  }
  getInitialDate():Observable<object>{
    return this.http.get(this.urlServer+"/GetAll");
  }
  postSubGenre(genre_id:string, subgenreName:string):Observable<object>{
     return this.http.get(this.urlServer+"/addSubGenre"+"/?genre_id="+genre_id+"&subGenreName="+subgenreName)
  }
}
