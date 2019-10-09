import { Component, OnInit } from '@angular/core';
import {SessionService} from '../session.service';
import {ActivatedRoute, Router} from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLandingPage: boolean;

  constructor(private sessionService: SessionService, private location: Location) { }

  title = 'Human For Human';

  ngOnInit() {
    this.isLandingPage = this.location.path() === '/signup';
  }

  sessionIsValid() {
    return this.sessionService.sessionIsValid();
  }

  logout() {
    this.sessionService.logout();
  }

}
