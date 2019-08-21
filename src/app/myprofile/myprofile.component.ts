import { Component, OnInit } from '@angular/core';
import {UserprofileService} from '../userprofile.service';
import {ApiService} from '../api.service';

enum Views {
  identities,
  info,
}

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.css']
})
export class MyprofileComponent implements OnInit {
  view: Views;
  preferred_name: string;
    contact: string;

  get viewsEnum() { return Views; }

  constructor(private userprofileService: UserprofileService, private apiService: ApiService) {
    this.view = Views.identities;
  }

  ngOnInit() {
    this.preferred_name = this.userprofileService.preferred_name;
    this.contact = this.userprofileService.contact;
  }

  public saveProfile() {
    const myProfile = {'preferred_name': this.preferred_name, 'contact': this.contact};
    this.apiService.saveProfile(myProfile).subscribe(response => this.handle_response(response));
  }

  public handle_response(response) {
    if (response.status === 1) {
      this.userprofileService.setUserInfo(response.data);
    }
  }

}
