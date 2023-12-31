import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './componenet/header/header.component';
import { GlobalSearch } from './componenet/main/index/global-search/global-search.component';
import { SidebarComponent } from './componenet/main/index/sidebar/sidebar.component';
import { MainComponent } from './componenet/main/main.component';
import { FooterComponent } from './componenet/footer/footer/footer.component';
import {RouterModule, Routes} from "@angular/router";
import { RegistrationComponent } from './componenet/main/registration/registration.component';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { IndexComponent } from './componenet/main/index/index.component';
import {NgOptimizedImage} from "@angular/common";
import {ModalService} from "./Servises/ModalService/Modalservice";
import { AuthenticationModalComponent } from './componenet/allPopUp/auntification-modal/authentication-modal.component';
import {SingInService} from "./Servises/DataService/User/sin-in-srvice.service";
import { AdminPanelComponent } from './componenet/main/admin-panel/admin-panel.component';
import { UserPanelComponent } from './componenet/main/user-panel/user-panel.component';
import {RegistrationServices} from "./Servises/DataService/User/RegistrationServisce";
import {AvatarTransferServices} from "./Servises/FileService/AvatarTransferServices";
import { UsersComponent } from './componenet/main/admin-panel/users/users.component';
import { GenresComponent } from './componenet/main/admin-panel/genres/genres.component';
import { BooksComponent } from './componenet/main/admin-panel/books/books.component';
import {ChildNavbarComponent} from "./componenet/main/admin-panel/childNavbar/childNavbar.component";
import {GenreServices} from "./Servises/DataService/GenreServices/GenreServices";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from "../MaterialModule";
import { PopupComponent } from './componenet/allPopUp/popup/popup.component';
import { ConfirmPopupComponent } from './componenet/allPopUp/comform-popup/confirm-popup.component';
import { MyConfirmPageComponent } from './componenet/main/registration/confirm-page/my-confirm-page.component';
import {CodeInputModule} from "angular-code-input";
import {RedirectService} from "./Servises/RedirectService/redirectService";
import {GenreSubGenreCollectionService} from "./Servises/DataService/GenreServices/GenreSubGenreCollectionService";
import { UserEditPopupComponent } from './componenet/allPopUp/user-edit-popup/user-edit-popup.component';
import { AddPostComponent } from './componenet/main/add-post/add-post.component';
import { ReactiveFormsModule } from '@angular/forms';
import {BookPostService} from "./Servises/DataService/Book-post/book-post.service";
import { BookPostSmallComponent } from './componenet/main/index/book-post-small/book-post-small.component';
import {FormatDataStringService} from "./Servises/format-data-string.service";
import { DetailInfoComponent } from './componenet/main/deteil-info/detail-info.component';
import {FileBookDownloadService} from "./Servises/FileService/file-book-download.service";
import { InfoPopUpComponent } from './componenet/allPopUp/info-pop-up/info-pop-up.component';
import { PdfViewerModule} from "ng2-pdf-viewer";
import { OnlineReaderComponent } from './componenet/main/online-reader/online-reader.component';
import { CommentFormComponent } from './componenet/main/deteil-info/comment-form/comment-form.component';
import {CommentService} from "./Servises/DataService/comment.service";
import { CommentItemComponent } from './componenet/main/deteil-info/comment-item/comment-item.component';
import { UserInfoEditComponent } from './componenet/main/user-panel/user-info-edit/user-info-edit.component';
import { ForReadComponent } from './componenet/main/user-panel/for-read/for-read.component';
import { UserBookComponent } from './componenet/main/user-panel/user-book/user-book.component';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import { EditBookComponent } from './componenet/main/edit-book/edit-book.component';
import { UserSelfEditPopupComponent } from './componenet/allPopUp/user-self-edit/user-self-edit-popup.component';

const adminAPanelRoutes: Routes=[
  {path: "user", component:UsersComponent },
  {path: "books", component:BooksComponent },
  {path: "genre", component:GenresComponent },
]

const userPage : Routes=[
  {path:"editUser",component:UserInfoEditComponent},
  {path:"userBook",component:UserBookComponent},
  {path:"forRead",component:ForReadComponent},


]
const MainPageRouth : Routes =[
  {path:"",component:IndexComponent},
  {path:"registration",component:RegistrationComponent},
  {path:"confirmCode",component:MyConfirmPageComponent},
  {path:"userPanel",component:UserPanelComponent,children:userPage},
  {path:"adminPanel",component:AdminPanelComponent,children:adminAPanelRoutes},
  {path:"addPost",component:AddPostComponent},
  {path:"editPost/:id",component:EditBookComponent},
  {path: "detail/:id",component: DetailInfoComponent},
  {path: "reader", component: OnlineReaderComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    GlobalSearch,
    SidebarComponent,
    ChildNavbarComponent,
    MainComponent,
    FooterComponent,
    RegistrationComponent,
    IndexComponent,
    AuthenticationModalComponent,
    AdminPanelComponent,
    UserPanelComponent,
    UsersComponent,
    GenresComponent,
    BooksComponent,
    PopupComponent,
    ConfirmPopupComponent,
    MyConfirmPageComponent,
    UserEditPopupComponent,
    AddPostComponent,
    BookPostSmallComponent,
    DetailInfoComponent,
    InfoPopUpComponent,
    OnlineReaderComponent,
    CommentFormComponent,
    CommentItemComponent,
    UserInfoEditComponent,
    ForReadComponent,
    UserBookComponent,
    EditBookComponent,
    UserSelfEditPopupComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(MainPageRouth),
    FormsModule,
    HttpClientModule,
    NgOptimizedImage,
    BrowserAnimationsModule,
    MaterialModule,
    CodeInputModule,
    ReactiveFormsModule,
    PdfViewerModule,
  ],
  providers:
    [ModalService,
    SingInService,
    RegistrationServices,
    AvatarTransferServices,
    GenreServices,
    RedirectService,
    GenreSubGenreCollectionService,
    BookPostService,
    FormatDataStringService,
    FileBookDownloadService,
    CommentService,
     { provide: MAT_DIALOG_DATA, useValue: {} },
     { provide: MatDialogRef, useValue: {} }
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
