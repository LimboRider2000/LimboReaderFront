import {Injectable} from "@angular/core";
import {serverAddress} from "../ServerAddress";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
@Injectable()
export class SingInService {

   urlServer : string = serverAddress+"Api/Authentication"
  constructor(private http:HttpClient) {}


  SingInDataTooServer(login:string,password:string){
    const headers = new HttpHeaders({ "Content-Type": "application/x-www-form-urlencoded" });

    const body = new HttpParams()
      .set("login", login)
      .set("passwordHash", password);

    return this.http.post(this.urlServer, body.toString(), { headers });
  }

}
