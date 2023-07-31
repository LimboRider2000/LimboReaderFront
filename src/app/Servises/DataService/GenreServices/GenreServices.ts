import {Injectable} from "@angular/core";
import {serverAddress} from "../ServerAddress";
import {HttpClient, HttpParams} from "@angular/common/http";
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

  editGenre(item: string, id: string) {
    const body = {id:id, genreName: item,}
      return this.http.put(this.urlServer, body)
  }

  editSubGenre(currentSelectSubGenreId: string, newSubGenreName:string,  id: string) {
     const  body = {
       id : currentSelectSubGenreId,
       genre_id: id,
       subGenreName:newSubGenreName
     }
    return this.http.put(this.urlServer+"/putSubGenre", body)
  }

   deleteGenre(id:string) {
   return  this.http.delete(this.urlServer +"/?id="+id)
  }

  deleteSubGenre(id: string) {
    return  this.http.delete(this.urlServer+"/DeleteSubGenre" +"/?id="+id)
  }
}
