import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {ApiService} from '../api.service';
import {Md5} from 'ts-md5/dist/md5';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {
  signupid: number;
  email: string;
  password1: string;
  password2: string;

  constructor(private route: ActivatedRoute, private apiService: ApiService) { }

  ngOnInit() {
    this.password1 = '';
    this.password2 = '';
    this.route.params.subscribe(params => {
      if (params['signupid']) {
          this.signupid = +params['signupid']; // (+) converts string 'id' to a number

          // In a real app: dispatch action to load the details here.
          this.apiService.getSignupEmail(this.signupid)
              .subscribe(response => this.handle_response(response));
      }
    });
  }

  handle_response(response) {
      if (response.status === 1) {
          this.email = response.data.email;
      }
  }

  buttonDisabled() {
    if (this.password1.length < 2) {
      return true;
    }
    if (this.password1 !== this.password2) {
      return true;
    }
    return false;
  }

  createButtonClick() {
    if (this.password1==this.password2) {
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
  }

}
