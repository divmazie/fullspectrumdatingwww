import { Injectable } from '@angular/core';
import {UserprofileService} from './userprofile.service';
import {ApiService} from './api.service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  id: number;
  hash: string;

  constructor(private router: Router) {
      this.id = Number(localStorage.getItem('session_id'));
      this.hash = localStorage.getItem('session_hash');
  }

  public setSessionInfo(info) {
      this.id = info.session_id;
      this.hash = info.session_hash;
      localStorage.setItem('session_id', info.session_id);
      localStorage.setItem('session_hash', info.session_hash);
  }

  public sessionIsValid() {
    return !!this.id;
  }

  public logout() {
      this.id = undefined;
      this.hash = undefined;
      localStorage.removeItem('session_id');
      localStorage.removeItem('session_hash');
      localStorage.removeItem('user_profile_preferred_name');
      localStorage.removeItem('user_profile_birthday');
      this.router.navigate(['/signin']);
  }
}
