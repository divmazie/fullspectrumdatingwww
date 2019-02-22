import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  id: number;
  hash: string;

  constructor() { }

  public setSessionInfo(info) {
    this.id = info.session_id;
    this.hash = info.session_hash;
  }

  public sessionIsValid() {
    return !!this.id;
  }
}
