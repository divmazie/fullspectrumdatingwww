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
import { DimensionsUiComponent } from './dimensions-ui/dimensions-ui.component';
import { SigninComponent } from './signin/signin.component';
import { HeaderComponent } from './header/header.component';
import { SearchComponent } from './search/search.component';
import { MyprofileComponent } from './myprofile/myprofile.component';
import { MatchComponent } from './match/match.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatFormFieldModule, MatDialogModule,
    MatInputModule, MatCheckboxModule, MatDatepickerModule, MatRadioModule } from '@angular/material';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { AngularFileUploaderModule } from 'angular-file-uploader';
import { UploadPictureComponent } from './upload-picture/upload-picture.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { NewProfileComponent } from './new-profile/new-profile.component';
import { WordCloudGeneratorComponent } from './word-cloud-generator/word-cloud-generator.component';

declare var $: any;


@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    NewUserComponent,
    DimInputComponent,
    PlaygroundComponent,
    DimensionsUiComponent,
    SigninComponent,
    HeaderComponent,
    SearchComponent,
    MyprofileComponent,
    MatchComponent,
    UploadPictureComponent,
    ResetPasswordComponent,
    NewProfileComponent,
    WordCloudGeneratorComponent
  ],
    entryComponents: [
        UploadPictureComponent
    ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatRadioModule,
    AngularFileUploaderModule,
    MatDialogModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
