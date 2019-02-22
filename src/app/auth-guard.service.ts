import { Injectable } from '@angular/core';
import { RouterModule, Routes, ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import {SessionService} from './session.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private sessionService: SessionService) { }

  canActivate(next: ActivatedRouteSnapshot): boolean {
    return this.sessionService.sessionIsValid();
  }
}
