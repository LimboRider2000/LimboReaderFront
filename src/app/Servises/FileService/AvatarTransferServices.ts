import {Injectable} from "@angular/core";
import {serverAddress} from "../DataService/ServerAddress";
import {HttpClient} from "@angular/common/http";
import {UserFormModel} from "../../model/User/UserFormModel";

@Injectable()
export class AvatarTransferServices{
  urlServer : string = serverAddress+"api/File"

  constructor(private http:HttpClient) {}
  DataSend(file:File){
    const formData = new FormData();
      formData.append("file", file);
    return this.http.post(this.urlServer,formData,{reportProgress:true})
  }
}
