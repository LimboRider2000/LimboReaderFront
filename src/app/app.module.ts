import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './componenet/header/headerTop/header.component';
import { HeaderBottomComponent } from './componenet/main/header-bottom/header-bottom.component';
import { NavbarComponent } from './componenet/main/MainNavbar/navbar.component';
import { MainComponent } from './componenet/main/main.component';
import { FooterComponent } from './componenet/footer/footer/footer.component';
import {RouterModule, Routes} from "@angular/router";
import { RegistrationComponent } from './componenet/main/registration/registration.component';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { IndexComponent } from './componenet/main/index/index.component';
import {NgOptimizedImage} from "@angular/common";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {ModalService} from "./Servises/Modal/Modalservice";
import { AuthenticationModalComponent } from './componenet/header/Modal/auntification-modal/authentication-modal.component';
import {SingInService} from "./Servises/DataService/User/sin-in-srvice.service";
import { MyButtonComponent } from './componenet/my-button/my-button.component';
import { AdminPanelComponent } from './componenet/main/admin-panel/admin-panel.component';
import { UserEditComponent } from './componenet/main/user-edit/user-edit.component';
import {RegistrationServices} from "./Servises/DataService/User/RegistrationServisce";
import {AvatarTransferServices} from "./Servises/DataService/FilesTransferServices/AvatarTransferServices";
import { UsersComponent } from './componenet/main/admin-panel/users/users.component';
import { GenresComponent } from './componenet/main/admin-panel/genres/genres.component';
import { TagsComponent } from './componenet/main/admin-panel/tags/tags.component';
import { BooksComponent } from './componenet/main/admin-panel/books/books.component';
import { AuthorsComponent } from './componenet/main/admin-panel/authors/authors.component';
import {ChildNavbarComponent} from "./componenet/childNavbar/childNavbar.component";

const adminAPanelRoutes: Routes=[
  {path: "user", component:UsersComponent },
  {path: "books", component:BooksComponent },
  {path: "genre", component:GenresComponent },
  {path: "tags", component:TagsComponent },
  {path: "authors", component:AuthorsComponent },



]

const appRoutes : Routes=[
  {path:"",component:IndexComponent},
  {path:"registration",component:RegistrationComponent},
  {path:"editUser",component:UserEditComponent},
  {path:"adminPanel",component:AdminPanelComponent,children:adminAPanelRoutes}


]
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HeaderBottomComponent,
    NavbarComponent,
    ChildNavbarComponent,
    MainComponent,
    FooterComponent,
    RegistrationComponent,
    IndexComponent,
    AuthenticationModalComponent,
    MyButtonComponent,
    AdminPanelComponent,
    UserEditComponent,
    UsersComponent,
    GenresComponent,
    TagsComponent,
    BooksComponent,
    AuthorsComponent,
  ],
  imports: [
    BrowserModule, RouterModule.forRoot(appRoutes), FormsModule, HttpClientModule, NgOptimizedImage, NgbModule,
  ],
  providers:
    [ModalService,
    SingInService,
    RegistrationServices,
    AvatarTransferServices
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
