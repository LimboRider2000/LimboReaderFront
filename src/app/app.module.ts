import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './componenet/header/headerTop/header.component';
import { HeaderBottomComponent } from './componenet/header/header-bottom/header-bottom.component';
import { NavbarComponent } from './componenet/main/navbar/navbar.component';
import { MainComponent } from './componenet/main/main/main.component';
import { FooterComponent } from './componenet/footer/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HeaderBottomComponent,
    NavbarComponent,
    MainComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
