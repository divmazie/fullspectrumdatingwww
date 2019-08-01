import { Component, OnInit } from '@angular/core';
import {UserprofileService} from '../userprofile.service';
import {ApiService} from '../api.service';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.css']
})
export class MyprofileComponent implements OnInit {
  view: string;
  preferred_name: string;

  constructor(private userprofileService: UserprofileService, private apiService: ApiService) {
    this.view = 'info';
  }

  ngOnInit() {
      this.preferred_name = this.userprofileService.preferred_name;
  }

  public savePreferredName() {
    this.apiService.savePreferredName(this.preferred_name).subscribe(response => this.handle_response(response));
  }

  public handle_response(response) {
    if (response.status === 1) {
      this.userprofileService.setUserInfo(response.data);
    }
  }

}
