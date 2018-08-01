import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

const API_URL = environment.apiUrl;
const httpOptions = {
  //headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable()
export class ApiService {

  constructor(private http:HttpClient) {}

  private getApiCall(request) {
    var body = new HttpParams().set('request',JSON.stringify(request));
    return this.http.post(API_URL,body);
  }

  private getRequestObject(resource,data) {
    var request = {
      resource: resource,
      data: null
    };
    if (data) {
      request.data = data;
    }
    return request;
  }

  public getEmails() {
    var request = this.getRequestObject('signup-emails/get-all',false);
    return this.getApiCall(request);
  }

  public submitEmail(email) {
    var request = this.getRequestObject('signup-emails/save',email);
    return this.getApiCall(request);
  }

  public getSignupEmail(signupid) {
    var request = this.getRequestObject('signup-emails/get-by-signupid',signupid);
    return this.getApiCall(request);
  }

  private handleError (error: Response | any) {
    console.error('ApiService::handleError', error);
    return Observable.throw(error);
  }

}
