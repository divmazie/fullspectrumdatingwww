import {Component, Input, OnInit} from '@angular/core';
import {ApiService} from '../api.service';
import {Match, MatchDim} from '../match/match.component';

export interface Profile {
    id: number;
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
  view: string;
  match_detail: Match;
  theyLikeYou: MatchDim[];
  youLikeThem: MatchDim[];
  youNotLikeThem: MatchDim[];

  constructor(private apiService: ApiService) {
    this.matches = [];
    this.view = 'preferences';
  }

  ngOnInit() {
      this.apiService.getMatches()
          .subscribe(response => this.processGetMatches(response));
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

  getMatch(profile_id) {
      this.apiService.getMatch(profile_id).subscribe(response => this.processGetMatch(response));
  }

  processGetMatch(response) {
      this.match_detail = response.data.match;
      this.theyLikeYou = response.data.theyLikeYou;
      this.youLikeThem = response.data.youLikeThem;
      this.youNotLikeThem = response.data.youNotLikeThem;
      // alert(JSON.stringify(this.youNotLikeThem));
  }

}
