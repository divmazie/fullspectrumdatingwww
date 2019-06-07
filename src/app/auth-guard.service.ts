import { Injectable } from '@angular/core';
import { RouterModule, Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import {SessionService} from './session.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private sessionService: SessionService, private router: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.sessionService.sessionIsValid()) {
        return true;
    } else {
        this.router.navigate(['/signin'], {
            queryParams: {
                return: state.url
            }
        });
        return false;
    }
  }
}
