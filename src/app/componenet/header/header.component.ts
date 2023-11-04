import {Component, inject, Input, OnInit} from '@angular/core';
import {User} from "../../model/User/User";
import {Router} from "@angular/router";
import {BookPostService} from "../../Servises/DataService/Book-post/book-post.service";
import {MatDialog} from "@angular/material/dialog";
import {AuthenticationModalComponent} from "../allPopUp/auntification-modal/authentication-modal.component";
import {AuthenticationUserService} from "../../Servises/authentication-user.service";
import {UserService} from "../../Servises/DataService/User/user.service";
import {BehaviorSubject} from "rxjs";


@Component({
    selector: 'app-headerTop',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    public readonly auntDialog = inject(MatDialog)
    private readonly routh: Router = inject(Router)
    private readonly bookService: BookPostService = inject(BookPostService)
    private readonly userService = inject(UserService)
    // public user: User | null = null;
    private readonly auntService = inject(AuthenticationUserService)
    public user$: BehaviorSubject<User|null>

    ngOnInit() {
      if(localStorage.getItem("user")!= null){
        this.auntService.setUser( JSON.parse(localStorage.getItem("user")!))
      }
        this.user$  = this.auntService.UserObservable;
         sessionStorage.setItem("user", JSON.stringify(this.user$?.value));

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
                        this.auntService.setUser( JSON.parse(sessionStorage.getItem("user")!))
                }
            }
        )
    }

    // @Input() user:User;

    @Input() bookCount$ = this.bookService.getGlobalBookCountObservable();
    @Input() userCount$ = this.userService.getUserCountObservable();

    Exit() {
        sessionStorage.clear();
        localStorage.removeItem("user")
        this.auntService.setUser(null)
        // this.user = null;
        this.routh.navigateByUrl("")
    }
}
