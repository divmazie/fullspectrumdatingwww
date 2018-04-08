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
  showError = false;
  showThanks = false;

  ngOnInit() {
  }

  checkEmailFormat() {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.showError = !re.test(String(this.emailinput).toLowerCase());
  }

  submitEmail() {
    this.checkEmailFormat();
    if (!this.showError) {
      this.apiService.submitEmail(this.emailinput)
        .subscribe(response => this.showThanks = !!response['status']);
    }
  }

}
