import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../api.service';
import {Md5} from 'ts-md5/dist/md5';
import {SessionService} from '../session.service';
import {UserprofileService} from '../userprofile.service';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {
  inviteCode: string;
  email: string;
  password1: string;
  password2: string;

  constructor(private route: ActivatedRoute, private apiService: ApiService, private sessionService: SessionService,
              private router: Router, private userService: UserprofileService) { }

  ngOnInit() {
    this.password1 = '';
    this.password2 = '';
    this.route.paramMap.subscribe(params => {
      if (params.get('invite_code')) {
          this.inviteCode = params.get('invite_code');

          // In a real app: dispatch action to load the details here.
          this.apiService.getSignupEmail(this.inviteCode)
              .subscribe(response => this.handle_response(response));
      } else {
          this.router.navigate(['/signup']);
      }
    });
  }

  handle_response(response) {
      if (response.status === 1) {
          this.email = response.data.email;
      } else {
          this.router.navigate(['/signup']);
      }
  }

  buttonDisabled() {
    if (this.password1.length < 8) {
      return true;
    }
    return this.password1 !== this.password2;
  }

  createButtonClick() {
    if (this.password1 === this.password2) {
        const password_hash = Md5.hashStr(this.password1);
        this.apiService.accountCreate(this.email, password_hash)
            .subscribe(response => this.handle_creation_response(response));
    }
  }

  handle_creation_response(response) {
    console.log(response);
    if (response.status === 1) {
        const password_hash = Md5.hashStr(this.password1);
        this.apiService.accountSignin(this.email, password_hash)
          .subscribe(response => this.handle_signin_response(response));
    } else {
      alert(response.errorMessage);
    }
  }

  handle_signin_response(response) {
    console.log(response);
    this.sessionService.setSessionInfo(response.data);
    this.userService.getUserProfile();
    this.router.navigate(['/home']);
  }

}
