import { Injectable } from '@angular/core';
import {ApiService} from './api.service';

@Injectable({
  providedIn: 'root'
})
export class UserprofileService {
  preferred_name: string;
  birthday: string;
  contact: string;

  constructor(private apiService: ApiService) {
      // this.preferred_name = localStorage.getItem('user_profile_preferred_name');
      // this.birthday = localStorage.getItem('user_profile_birthday');
      // this.contact = localStorage.getItem('user_profile_contact');
      // if (this.infoEmpty()) {
        this.getUserProfile();
      // }
  }

  public infoEmpty() {
    return !this.preferred_name && !this.birthday && !this.contact;
  }

  public setUserInfo(info) {
      // alert(JSON.stringify(info));
      this.preferred_name = info.preferred_name;
      this.birthday = info.birthday;
      this.contact = info.contact;
      // localStorage.setItem('user_profile_preferred_name', info.preferred_name);
      // localStorage.setItem('user_profile_birthday', info.birthday);
      // localStorage.setItem('user_profile_contact', info.contact);
  }

  public getUserProfile() {
      if (this.infoEmpty()) {
          this.apiService.getUserProfile().subscribe(response => this.handle_profile_response(response));
      }
  }

  private handle_profile_response(response) {
      console.log(response);
      if (response.status === 1) {
          this.setUserInfo(response.data);
      }
  }
}
