import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { ApiService } from './api.service';
import { AppRoutingModule } from './app-routing.module';

import { SignupComponent } from './signup/signup.component';
import { NewUserComponent } from './new-user/new-user.component';
import { DimInputComponent } from './dim-input/dim-input.component';
import { PlaygroundComponent } from './playground/playground.component';

declare var $: any;


@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    NewUserComponent,
    DimInputComponent,
    PlaygroundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
