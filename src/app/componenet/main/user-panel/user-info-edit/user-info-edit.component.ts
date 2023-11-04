import {Component, ElementRef, inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup,  Validators} from "@angular/forms";
import {UserService} from "../../../../Servises/DataService/User/user.service";
import {MatDialog} from "@angular/material/dialog";
import {UserSelfEditPopupComponent} from "../../../allPopUp/user-self-edit/user-self-edit-popup.component";
import {Subscription} from "rxjs";
import {User} from "../../../../model/User/User";
import {AuthenticationUserService} from "../../../../Servises/authentication-user.service";

@Component({
  selector: 'app-user-info-edit',
  templateUrl: './user-info-edit.component.html',
  styleUrls: ['./user-info-edit.component.css']
})
export class UserInfoEditComponent implements OnInit, OnDestroy{

  protected readonly sessionStorage = sessionStorage;
  @ViewChild("regBtn") regBtn: ElementRef<HTMLButtonElement>
  @ViewChild("avatarInput") avatarInput: ElementRef<HTMLInputElement>
  private readonly  fb = inject(FormBuilder)
  private readonly auntUser = inject(AuthenticationUserService)
  private readonly  userService
    = inject(UserService)
  private readonly modal = inject(MatDialog);
  serverValidationError: any;
  formBuilderData: FormGroup;
  previewAvatarImg: string;
  fileError: any;
  message:string = "";
  isSuccess:boolean;
  subscribe: Subscription;
  user:User|null;

  ngOnInit(): void {
    this.formBuilderData = this.fb.group({
      userId:[""],
      name:["",[Validators.required,]],
      mail:["",[Validators.required
        ,Validators.email,
        Validators
          .pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$") ]],
      login:["",[Validators.required]],
      avatar:[null],
    })

    if(localStorage.getItem("user")!= null)
      this.user =JSON.parse( localStorage.getItem("user")!)

    this.formBuilderData.get("userId")
      ?.setValue(this.user?.id)
    const tempName
      = this.user?.name;
    if(tempName != null)
      this.formBuilderData.get("name")
        ?.setValue(tempName);
    this.formBuilderData.get("mail")
      ?.setValue(this.user?.email)
    this.formBuilderData.get("login")
      ?.setValue(this.user?.login)

    if(this.user != null)
      this.previewAvatarImg = this.user?.avatar

  }
  submit($event: any) {
    $event.preventDefault();
    this.regBtn.nativeElement.disabled = true;
    const formData = new FormData();
    for (let key of
      Object.keys(this.formBuilderData.controls)){
      let value
        = this.formBuilderData.get(key)?.value
      value = value as String
      formData.append(key,value);
    }

  this.subscribe =  this.userService.editUserSelf(formData).subscribe({
      next: (data:any) =>{
        if(data.isSuccess){
          this.isSuccess = data.isSuccess ;
          this.message ="Изменения прошли успешно";
          this.auntUser.setUser(data.user)
        sessionStorage.setItem("user",JSON.stringify(data.user))
        localStorage.setItem("user",JSON.stringify(data.user))
        }
         else if(data.isSuccess){
           this.isSuccess = data.isSuccess;
           this.message =data.message;
         }
      },
      error: (err)=> console.error(err),
      complete:()=>{
        if(this.message != null && this.message.length > 0){
          setInterval(()=>{
            this.message = "";
            this.isSuccess = false;
          },3000)
        }
      }
    })

  }
  setAvatar($event: Event) {
    const file = ($event.target as HTMLInputElement).files![0]
    const fr = new FileReader()
    fr.onload = ()=>{
      this.previewAvatarImg = fr.result as string
    }
    fr.readAsDataURL(file);
    this.formBuilderData.get("avatar")?.setValue(file)
  }
  resetAvatarFile() {
      const av = this.user?.avatar;
    if(av)
      this.previewAvatarImg = av;
    this.formBuilderData.get("avatar")?.setValue(null)
    this.avatarInput.nativeElement.value ="";
  }
  passwordChange() {
  this.modal.open(UserSelfEditPopupComponent,{
    width: " 30%",
    enterAnimationDuration: 300,
    exitAnimationDuration: 300,
    disableClose: true,
    data:{
      title:"Смена пароль",
       userId: sessionStorage.getItem("id")
    }
  })
  }

  ngOnDestroy(): void{
  if(this.subscribe != undefined)
      this.subscribe.unsubscribe();
  }
}
