import { Injectable } from '@angular/core';
import {ApiService} from './api.service';

@Injectable({
  providedIn: 'root'
})
export class UserprofileService {
  preferred_name: string;
  birthday: string;

  constructor(private apiService: ApiService) {
      this.preferred_name = localStorage.getItem('user_profile_preferred_name');
      this.birthday = localStorage.getItem('user_profile_birthday');
      if (this.infoEmpty()) {
        this.getUserProfile();
      }
  }

  public infoEmpty() {
    return !this.preferred_name && !this.birthday;
  }

  public setUserInfo(info) {
      this.preferred_name = info.preferred_name;
      this.birthday = info.birthday;
      localStorage.setItem('user_profile_preferred_name', info.preferred_name);
      localStorage.setItem('user_profile_birthday', info.birthday);
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
