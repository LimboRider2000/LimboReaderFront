import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {serverAddress} from "../DataService/ServerAddress";

@Injectable({
  providedIn: 'root'
})
export class FileBookDownloadService {

  private  http = inject(HttpClient)
  private serverUrl = serverAddress + "api/File"

  downloadBookFile(id: string,extension:string) {
   return  this.http.get(this.serverUrl+"/?book_id="+id+"&extension="+extension,{observe:"response",responseType:"blob"})
  }
  checkFileExist(filePath:string){
      return this.http.get(this.serverUrl+"/ExistFile/?path="+filePath)
  }

  checkFilesForExtension(filePath: string) {
  return  this.http.get(this.serverUrl+"/CheckExtensions/?filePath="+filePath)
  }
}
