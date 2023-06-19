import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './componenet/header/headerTop/header.component';
import { HeaderBottomComponent } from './componenet/main/header-bottom/header-bottom.component';
import { NavbarComponent } from './componenet/main/navbar/navbar.component';
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

const appRouths : Routes=[
  {path:"",component:IndexComponent},
  {path:"registration",component:RegistrationComponent}
]
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HeaderBottomComponent,
    NavbarComponent,
    MainComponent,
    FooterComponent,
    RegistrationComponent,
    IndexComponent,
  ],
  imports: [
    BrowserModule, RouterModule.forRoot(appRouths), FormsModule, HttpClientModule, NgOptimizedImage, NgbModule,
  ],
  providers: [ModalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
