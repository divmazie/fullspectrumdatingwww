import { Component, OnInit } from '@angular/core';
import {ApiService} from '../api.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  email: string;
  showSuccess: boolean;
  showFailure: boolean;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.showFailure = false;
    this.showSuccess = false;
  }

  buttonDisabled() {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return !re.test(String(this.email).toLowerCase());
  }

  buttonClick() {
    this.apiService.resetPassword(this.email)
          .subscribe(response => this.handle_response(response));
  }

  handle_response(response) {
      console.log(response);
      if (response.status === 1) {
          this.showSuccess = true;
      } else {
        this.showFailure = true;
      }
  }

}
