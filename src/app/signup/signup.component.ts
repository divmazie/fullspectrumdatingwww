import { Component, OnInit } from '@angular/core';
import {ApiService} from '../api.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private apiService: ApiService) { }

  consent = false;
  emailinput = '';
  emailvalid = false;
  errorMessage;
  submitdisabled = true;
  showError = false;
  showThanks = false;

  ngOnInit() {
  }

  checkEmailFormat() {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.emailvalid = re.test(String(this.emailinput).toLowerCase());
    this.submitdisabled = !this.emailvalid;
  }

  submitEmail() {
    this.showError = false;
    this.checkEmailFormat();
    if (!this.emailvalid) {
      this.showError = true;
      this.errorMessage = 'Please enter valid email address';
    }
    if (!this.showError) {
      this.submitdisabled = true;
      this.apiService.submitEmail(this.emailinput)
        .subscribe(response => this.handle_response(response));
    }
  }

  handle_response(response) {
    // alert(JSON.stringify(response));
    this.showThanks = !!response['status'];
    if (response['status']==0) {
      this.submitdisabled = false;
      this.errorMessage = response['errorMessage'];
      this.showError = true;
    }
  }

}
