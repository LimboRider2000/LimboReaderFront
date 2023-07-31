import {Injectable} from "@angular/core";
import {serverAddress} from "../ServerAddress";
import {HttpClient} from "@angular/common/http";
import {UserFormModel} from "../../../model/UserFormModel";
import {AvatarTransferServices} from "../FilesTransferServices/AvatarTransferServices";
import {map, mergeMap, retry} from "rxjs";
import {Router} from "@angular/router";

@Injectable()
export class RegistrationServices{
  urlServer : string = serverAddress+"api/registration"

  constructor(private http:HttpClient,private fileServ: AvatarTransferServices, private rout: Router) {}
  DataSend(user:UserFormModel, file:File|null){

      const body = {
        "login":user.login,
        "password":user.password,
        "name":user.name,
        "email": user.email,
        "avatar":""
      }

    if (file !== null) {
     return  this.fileServ.DataSend(file).pipe(
        map((path:any) => {
        body.avatar = path.dbPath
        })).subscribe(pathStr =>
         this.http.post(this.urlServer, body).subscribe( (data:any) =>{
             if(data.success === true){
               sessionStorage.setItem("idRegisteredUser",data.id)
               this.rout.navigateByUrl("/confirmPAge")
             }else {console.log("registration fall")}
           },
           (error)=>{console.log("registration error "+ error)})
     )
    }else  return  this.http.post(this.urlServer, body).subscribe( (data:any) =>{
        if(data.success === true){
          sessionStorage.setItem("idRegisteredUser",data.id)
          this.rout.navigateByUrl("/confirmPage")
        }else {console.log("registration fall")}
      },
      (error)=>{console.log("registration error "+ error)})

  }
 public CodeCheck(code:string,userId :string){
    return this.http.get(this.urlServer+"/?code="+code+"&userId="+userId)
  }
}
