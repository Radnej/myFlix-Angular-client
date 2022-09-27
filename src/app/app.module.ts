import { NgModule } from '@angular/core';

//simplified API for Angular applications that makes it possible for the client app to communicate with the API or server-side
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { MatAutocompleteModule, MatButtonModule, MatCheckboxModule, MatDatepickerModule, 
  MatFormFieldModule, MatInputModule, MatRadioModule, MatSelectModule, MatSliderModule, 
  MatSlideToggleModule } from '@angular/material';
  
 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    MatAutocompleteModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
