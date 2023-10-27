import {Component, ElementRef, inject, Input, ViewChild} from '@angular/core';
import {User} from "../../../model/User/User";
import {NgForm} from "@angular/forms";
import {RegistrationServices} from "../../../Servises/DataService/User/RegistrationServisce";
import {UserFormModel} from "../../../model/User/UserFormModel";
import {FileValidationService} from "../../../Servises/FileService/file-validation.service";




@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  @Input() user:User= new User();
  @Input() myPassword: string;
  @Input() myRepeatPassword:string;
  @Input() serverValidationError : string;
  @Input() fileError: string = '';
  avatarFile: File| null = null;
@ViewChild("myForm") form:ElementRef<NgForm>;
  fileValidService = inject(FileValidationService)
   constructor(private regSer:RegistrationServices) {}
  FromSubmit(myForm:NgForm){
    const user: UserFormModel =  new UserFormModel();
    user.login = myForm.value.Login;
    user.password = myForm.value.password;
    user.email = myForm.value.email;
    user.name = myForm.value.name;
    if(this.avatarFile !== null){
        user.avatar = this.avatarFile
     }
   this.regSer.DataSend(user,this.avatarFile)
  }
  handleFileInput(event:any) {
    const files : FileList= event.target.files;
    this.avatarFile = <File>files[0];

    if(this.avatarFile === null ) return;

    const maxSize = 51200;
    this.fileError = this.fileValidService.isFileValid(this.avatarFile,maxSize);

  }
}
