import { Component, OnInit } from '@angular/core';
import {Md5} from 'ts-md5';
import {ApiService} from '../api.service';
import {SessionService} from '../session.service';
import {AppRoutingModule} from '../app-routing.module';
import {Router} from '@angular/router';
import {UserprofileService} from '../userprofile.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
    email: string;
    password1: string;

    constructor(private apiService: ApiService,
                private sessionService: SessionService,
                private userprofileService: UserprofileService,
                private router: Router) { }

    ngOnInit() {
        this.email = '';
        this.password1 = '';
    }

    buttonDisabled() {
        if (this.password1.length < 2 || this.email.length < 2) {
            return true;
        }
        return false;
    }

    signinButtonClick() {
        const password_hash = Md5.hashStr(this.password1);
        this.apiService.accountSignin(this.email, password_hash)
            .subscribe(response => this.handle_signin_response(response));
    }

    handle_signin_response(response) {
        console.log(response);
        if (response.status === 1) {
            this.sessionService.setSessionInfo(response.data);
            this.userprofileService.setUserInfo(response.data.userprofile);
            this.router.navigate(['/home']);
        } else {
            alert(response.errorMessage);
        }
    }

}
