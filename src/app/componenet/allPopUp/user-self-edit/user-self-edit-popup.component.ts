import {Component, ElementRef, Inject, inject, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../Servises/DataService/User/user.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
    selector: 'app-user-self-edit',
    templateUrl: './user-self-edit-popup.component.html',
    styleUrls: ['./user-self-edit-popup.component.css']
})
export class UserSelfEditPopupComponent implements OnInit {

    @ViewChild("repeatNewPassInput")
    repeatNewPassInput: ElementRef<HTMLInputElement>
    @ViewChild("btnEdit")
    btnEdit: ElementRef<HTMLButtonElement>

    private readonly fb = inject(FormBuilder)
    private readonly userService = inject(UserService)
    passwordChangeForm: FormGroup;
    isSuccess: boolean = false;
    message: string = "";
    inputData: any;

    Submit($event: any) {
        this.btnEdit.nativeElement.disabled = true
        $event.preventDefault();
        const newPass = this.passwordChangeForm.get("newPassword")
        this.message = ""
        if (this.repeatNewPassInput.nativeElement.value !==
            newPass?.value as String) {
            this.message = "Пароль не совпадает"
            return
        }
        this.passwordChangeForm.get("userId")?.setValue(this.inputData.userId)
        const formDate = new FormData()
        for (const key of Object.keys(this.passwordChangeForm.controls)) {
            const value = this.passwordChangeForm.get(key)?.value as string
            formDate.append(key, value)
        }
        this.userService.passwordChange(formDate).subscribe({
                next: ((data: any) => {
                    if (data.isSuccess) {
                        this.isSuccess = true;
                        this.message = "Пароль успешно изменен"
                    } else {
                        this.isSuccess = false;
                        this.message = "Ошибка! неверный пароль"
                    }
                }),
                error: (error => {
                    console.error(error)
                }),
                complete: (() => {
                    setInterval(() => {
                        this.ref.close()
                    }, 2000)
                })
            }
        )
    }

    constructor(@Inject(MAT_DIALOG_DATA) public data: any, private ref: MatDialogRef<UserSelfEditPopupComponent>) {
    }

    ngOnInit(): void {
        this.inputData = this.data;
        this.passwordChangeForm = this.fb.group({
                userId: [""],
                oldPassword: ["", [Validators.required]],
                newPassword: ["", [Validators.required,
                    Validators.pattern('^(?=.*[A-Z])(?=.*[0-9])[A-Za-z_#0-9~()!@$%^&*]{6,}$')]],
            }
        )
    }
}
