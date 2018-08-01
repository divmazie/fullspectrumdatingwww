import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { ApiService } from './api.service';
import { AppRoutingModule } from './app-routing.module';

import { SignupComponent } from './signup/signup.component';
import { NewUserComponent } from './new-user/new-user.component';


@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    NewUserComponent
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
