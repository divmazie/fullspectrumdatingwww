import { Component, OnInit } from '@angular/core';
import {ApiService} from '../api.service';

export interface Profile {
    preferred_name: string;
    birthday: string;
    top_identities: string[];
    top_preferences: string[];
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  matches: Profile[];

  constructor(private apiService: ApiService) {
    this.matches = [];
  }

  ngOnInit() {
      this.apiService.getMatches()
          .subscribe(response => this.handle_response(response));
  }

  handle_response(response) {
      const _this = this;
      if (response['status'] === 1) {
          response['data']['matches'].forEach(function (match) {
              const newMatch = {
                preferred_name: match['preferred_name'],
                birthday: match['birthday'],
                top_identities: match['top_identities'],
                  top_preferences: match['top_preferences']
              };
              _this.matches.push(newMatch);
          });
      }
  }

}
