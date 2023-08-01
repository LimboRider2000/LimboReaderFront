import {Injectable} from "@angular/core";
import {serverAddress} from "../ServerAddress";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
@Injectable()
export class SingInService {

   urlServer : string = serverAddress+"Api/Authentication"
  constructor(private http:HttpClient) {}


  SingInDataTooServer(login:string,password:string):Observable<object>{
    const body = {
      "login": login,
      "password": password,
    }
    return this.http.post(this.urlServer, body)
  }

}
