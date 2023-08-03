import {NgModule} from "@angular/core";
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";

@NgModule({
  exports:[
    MatDialogModule,
    MatButtonModule,
  ]

})
export  class MaterialModule{};
