import {Component, inject, Input, OnInit} from '@angular/core';
import {User} from "../../model/User/User";
import {Router} from "@angular/router";
import {BookPostService} from "../../Servises/DataService/Book-post/book-post.service";
import {MatDialog} from "@angular/material/dialog";
import {AuthenticationModalComponent} from "../allPopUp/auntification-modal/authentication-modal.component";


@Component({
    selector: 'app-headerTop',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    public auntDialog = inject(MatDialog)
    private routh: Router = inject(Router)
    private bookService: BookPostService = inject(BookPostService)
    public user: User | null = null;

    ngOnInit() {
        if (localStorage.getItem("user") != null) {
            sessionStorage.setItem("user", localStorage.getItem("user")!);
            this.user = JSON.parse(sessionStorage.getItem("user")!)
        }
        // if(localStorage.getItem("Id")!= null){
        //   sessionStorage.setItem("Login", localStorage.getItem("Login")!)
        //   sessionStorage.setItem("id", localStorage.getItem("Id")!)
        //   if(localStorage.getItem("Avatar") !== null|| true){
        //     sessionStorage.setItem("Avatar",localStorage.getItem('Avatar')!)
        //   }else {
        //     sessionStorage.setItem("Avatar","../assets/img/img_avatar.png")
        //   }
        // }
    }

    callOpenModal() {
        const modal = this.auntDialog.open(AuthenticationModalComponent, {
            width: "30%",
            enterAnimationDuration: 300,
            exitAnimationDuration: 300,
            data: {
                title: "Авторизация"
            }
        });
        modal.afterClosed().subscribe(
            {
                complete: () => {
                    if (sessionStorage.getItem("user") != null)
                        this.user = JSON.parse(sessionStorage.getItem("user")!)
                }
            }
        )
    }

    // @Input() user:User;

    @Input() bookCount$ = this.bookService.getGlobalBookCountObservable();
    @Input() userCount: number = 0;


    Exit() {
        sessionStorage.clear();
        localStorage.removeItem("user")
        this.user = null;
        this.routh.navigateByUrl("")
    }
}
