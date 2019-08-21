import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {Dimension} from '../dimensions-ui/dimensions-ui.component';
import {DimensionCategoriesService} from '../dimension-categories.service';
import {ActivatedRoute} from '@angular/router';
import {ApiService} from '../api.service';
import {SessionService} from '../session.service';

export interface Match {
    preferred_name: string;
    profile_id: number;
    contact: string;
}
export interface MatchDim {
    dimension: Dimension;
    match_value: number;
    not: boolean;
}

enum Views {
    stats,
    bio,
    contact,
}

enum SelfEditable {
    preferred_name,
    birthday,
    nyc,
    bio1,
    bio2,
    bio3,
    contact
}

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css']
})
export class MatchComponent implements OnInit {
    @Input() self?: boolean;
    match: Match;
    editing: SelfEditable;
    editText: string;
    theyLikeYou: MatchDim[];
    youLikeThem: MatchDim[];
    youNotLikeThem: MatchDim[];
    maxMatchValue: number;
    view: Views;
    top_identities: Dimension[];
    top_preferences: Dimension[];

    get viewsEnum() { return Views; }

    get selfEditableEnum() { return SelfEditable; }

  constructor(private dimCatService: DimensionCategoriesService,
              private activatedRoute: ActivatedRoute,
              private apiService: ApiService) { }

  ngOnInit() {
      if (this.self) {
          this.apiService.getUserProfileMatch().subscribe(response => this.processGetMatch(response));
      } else {
          this.activatedRoute.params.subscribe(params => this.getMatch(params['id']));
      }
      this.view = Views.stats;
  }

  getMatch(profile_id) {
      this.apiService.getMatch(profile_id).subscribe(response => this.processGetMatch(response));
  }

  processGetMatch(response) {
        this.match = response.data.match;
        this.top_identities = response.data.top_identities;
        this.top_preferences = response.data.top_preferences;
        this.theyLikeYou = response.data.theyLikeYou;
        this.youLikeThem = response.data.youLikeThem;
        this.youNotLikeThem = response.data.youNotLikeThem;
        // alert(JSON.stringify(this.youNotLikeThem));
      this.theyLikeYou = this.theyLikeYou.sort((n1, n2) => n2.match_value - n1.match_value);
      this.youLikeThem = this.youLikeThem.sort((n1, n2) => n2.match_value - n1.match_value);
      this.youNotLikeThem = this.youNotLikeThem.sort((n1, n2) => n1.match_value - n2.match_value);
      this.maxMatchValue = 0;
      this.theyLikeYou.forEach((dim) => {
          if (dim.match_value > this.maxMatchValue) {
              this.maxMatchValue = dim.match_value;
          }
      });
      this.youLikeThem.forEach((dim) => {
          if (dim.match_value > this.maxMatchValue) {
              this.maxMatchValue = dim.match_value;
          }
      });
      this.youNotLikeThem.forEach((dim) => {
          if (-dim.match_value > this.maxMatchValue) {
              this.maxMatchValue = -dim.match_value;
          }
      });
  }

  /*
  ngOnChanges(changes) {
      this.theyLikeYou = this.theyLikeYou.sort((n1, n2) => n2.match_value - n1.match_value);
      this.youLikeThem = this.youLikeThem.sort((n1, n2) => n2.match_value - n1.match_value);
      this.youNotLikeThem = this.youNotLikeThem.sort((n1, n2) => n1.match_value - n2.match_value);
      // alert(JSON.stringify(this.youLikeThem));
  }*/

  matchDimString(matchDim: MatchDim) {
    if (matchDim.not) {
      return 'Not ' + matchDim.dimension.name.toLowerCase();
    } else {
      return matchDim.dimension.name;
    }
  }

  getDimFontSize(dim) {
      return 5 + (dim.match_value / this.maxMatchValue) * 50;
  }

  getNegativeDimFontSize(dim) {
      return 5 - (dim.match_value / this.maxMatchValue) * 50;
  }

  getDimCatColor(id: number) {
    return this.dimCatService.getColor(id);
  }

  setEditing(field: SelfEditable) {
      this.editing = field;
      switch (field) {
          case SelfEditable.preferred_name: this.editText = this.match.preferred_name; break;
          case SelfEditable.contact: this.editText = this.match.contact; break;
      }
  }

  finishedEditing() {
      let myProfile: object;
      switch (this.editing) {
          case SelfEditable.preferred_name: myProfile = {'preferred_name': this.editText};
              this.match.preferred_name = this.editText; break;
          case SelfEditable.contact: myProfile = {'contact': this.editText};
              this.match.contact = this.editText; break;
          default: myProfile = {}; break;
      }
      this.apiService.saveProfile(myProfile).subscribe(response => this.processGetMatch(response));
      this.editing = null;
  }

}
