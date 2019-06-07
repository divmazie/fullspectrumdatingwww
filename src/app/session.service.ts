import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  id: number;
  hash: string;

  constructor() {
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
}
