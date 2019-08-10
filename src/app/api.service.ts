import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {SessionService} from './session.service';

const API_URL = environment.apiUrl;
const httpOptions = {
  // headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ApiService {

  constructor(private http: HttpClient, private sessionService: SessionService) {}

  private getApiCall(request) {
    //  console.log(request);
    const body = new HttpParams().set('request', JSON.stringify(request));
    return this.http.post(API_URL, body);
  }

  private getRequestObject(resource, data) {
      const request = {
          resource: resource,
          data: null,
          session_info: {id: this.sessionService.id, hash: this.sessionService.hash}
      };
      if (data) {
          request.data = data;
      }
      return request;
  }


  private handleError (error: Response | any) {
    console.error('ApiService::handleError', error);
    return Observable.throw(error);
  }

  /************ SIGNUP EMAILS ************/

  public getEmails() {
    const request = this.getRequestObject('signup-emails/get-all', false);
    return this.getApiCall(request);
  }

  public submitEmail(email) {
    const request = this.getRequestObject('signup-emails/save', email);
    return this.getApiCall(request);
  }

  public getSignupEmail(invite_code) {
    const request = this.getRequestObject('signup-emails/get-by-invite-code', invite_code);
    return this.getApiCall(request);
  }

  /************ DIMENSIONS ************/

  public getDimensions() {
      const request = this.getRequestObject('dimensions/get-all', false);
      return this.getApiCall(request);
  }

    public getIdentities() {
        const request = this.getRequestObject('dimensions/get-identities', false);
        return this.getApiCall(request);
    }

    public getPreferences() {
        const request = this.getRequestObject('dimensions/get-preferences', false);
        return this.getApiCall(request);
    }

    public saveIdentity(identity) {
      const request = this.getRequestObject('dimensions/save-identity', identity);
      return this.getApiCall(request);
    }

    public savePreference(preference) {
        const request = this.getRequestObject('dimensions/save-preference', preference);
        return this.getApiCall(request);
    }

  /************ ACCOUNTS ************/

  public accountCreate(email, password_hash) {
    const request = this.getRequestObject('accounts/create', {email: email, password_hash: password_hash});
    return this.getApiCall(request);
  }

  public accountSignin(email, password_hash) {
      const request = this.getRequestObject('accounts/signin', {email: email, password_hash: password_hash});
      return this.getApiCall(request);
  }

  /************ PROFILES ************/

  public getMatches() {
      const request = this.getRequestObject('profiles/get-matches', false);
      return this.getApiCall(request);
  }

  public getMatch(profile_id) {
      const request = this.getRequestObject('profiles/get-match', profile_id);
      return this.getApiCall(request);
  }

  public getUserProfile() {
      const request = this.getRequestObject('profiles/user-profile', false);
      return this.getApiCall(request);
  }

  public saveProfile(name) {
      const request = this.getRequestObject('profiles/save-profile', name);
      return this.getApiCall(request);
  }

}
