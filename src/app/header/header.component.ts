import { Component, OnInit } from '@angular/core';
import {SessionService} from '../session.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private sessionService: SessionService, private router: Router) { }

  title = 'Human For Human';

  ngOnInit() {
  }

  sessionIsValid() {
    return this.sessionService.sessionIsValid();
  }

  logout() {
    this.sessionService.logout();
    this.router.navigate(['/signin']);
  }

}
