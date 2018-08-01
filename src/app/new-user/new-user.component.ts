import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {ApiService} from '../api.service';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {
  signupid: number;
  email: string;

  constructor(private route: ActivatedRoute, private apiService: ApiService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.signupid = +params['signupid']; // (+) converts string 'id' to a number

      // In a real app: dispatch action to load the details here.
      this.apiService.getSignupEmail(this.signupid)
          .subscribe(response => this.handle_response(response));
    });
  }

  handle_response(response) {
    if (response.status==1) {
      this.email = response.data.email;
    }
  }

}
