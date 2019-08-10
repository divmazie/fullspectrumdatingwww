import {Component, Input, OnInit} from '@angular/core';
import {ApiService} from '../api.service';
import { Location } from '@angular/common';
import { HostListener } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

export interface Profile {
    id: number;
    preferred_name: string;
    birthday: string;
    top_identities: string[];
    top_preferences: string[];
}

enum Views {
    preferences,
    matches,
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  matches: Profile[];
  view: Views;
  match_detail: boolean;

  get viewsEnum() { return Views; }

  constructor(private apiService: ApiService, private location: Location, private activatedRoute: ActivatedRoute) {
    this.matches = [];
    this.view = Views.preferences;
  }

  ngOnInit() {
      this.match_detail = false;
      this.apiService.getMatches()
          .subscribe(response => this.processGetMatches(response));
      this.activatedRoute.params.subscribe(params => {
          if (params['id']) {
              this.match_detail = true;
              this.view = Views.matches;
          }
      });
  }

  processGetMatches(response) {
      const _this = this;
      if (response['status'] === 1) {
          response['data']['matches'].forEach(function (match) {
              const newMatch = {
                  id: match['id'],
                  preferred_name: match['preferred_name'],
                  birthday: match['birthday'],
                  top_identities: match['top_identities'],
                  top_preferences: match['top_preferences']
              };
              _this.matches.push(newMatch);
          });
      }
  }

  back() {
      this.location.back();
      this.match_detail = false;
  }

    @HostListener('window:popstate', ['$event'])
    onPopState(event) {
        this.match_detail = false;
        console.log('Back button pressed');
    }


}
