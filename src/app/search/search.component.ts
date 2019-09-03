import {Component, Input, OnInit} from '@angular/core';
import {ApiService} from '../api.service';
import { Location } from '@angular/common';
import { HostListener } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {environment} from '../../environments/environment';

export interface Profile {
    id: number;
    preferred_name: string;
    bioline: string;
    picture_file: string;
    top_identities: string[];
    top_preferences: string[];
    cosine?: number;
}

enum Views {
    preferences,
    matches,
}

declare var $: any;

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  matches: Profile[];
  view: Views;
  match_detail: boolean;
  api_url = environment.apiUrl;
  cosines: object;

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
      const constrainHeight = function() {
          // TODO: Set height difference programatically
          const matchView = $('#matches_view');
          matchView.css({ height: $(window).innerHeight() - 175 });
      };
      constrainHeight();
      $(window).resize(function() {
          constrainHeight();
      });
  }

  processGetMatches(response) {
      // alert(response['data']['cosines']);
      const _this = this;
      if (response['status'] === 1) {
          this.cosines = JSON.parse(response['data']['cosines']);
          response['data']['matches'].forEach(function (match) {
              _this.matches.push(match);
          });
          this.assignCosines();
      }
  }

  assignCosines() {
      const _this = this;
      const proportion = 0.5;
      this.matches.forEach(function (match) {
          const match_cosines = _this.cosines[match.id];
          // alert(JSON.stringify(match_cosines));
          match.cosine = proportion * match_cosines['myprefs'] + (1 - proportion) * match_cosines['theirprefs'];
      });
      this.matches.sort((n1, n2) => n1.cosine - n2.cosine);
  }

  matchClicked() {
      this.match_detail = true;
      $('#match_detail').scrollTop(0);
  }

  back() {
      if (this.match_detail) {
          this.location.back();
          this.match_detail = false;
      }
  }

    @HostListener('window:popstate', ['$event'])
    onPopState(event) {
        this.match_detail = false;
        console.log('Back button pressed');
    }


}
