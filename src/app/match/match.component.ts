import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {Dimension} from '../dimensions-ui/dimensions-ui.component';
import {DimensionCategoriesService} from '../dimension-categories.service';
import {ActivatedRoute} from '@angular/router';
import {ApiService} from '../api.service';
import {SessionService} from '../session.service';
import {environment} from '../../environments/environment';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {UploadPictureComponent} from '../upload-picture/upload-picture.component';

export interface Match {
    preferred_name: string;
    profile_id: number;
    age: number;
    birthday?: string;
    bioline: string;
    picture_file: string;
    nyc: number;
    contact: string;
    bio1: string;
    bio2: string;
    bio3: string;
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
    bioline,
    bio1,
    bio2,
    bio3,
    contact
}

declare var $: any;

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
    api_url = environment.apiUrl;

    get viewsEnum() { return Views; }

    get selfEditableEnum() { return SelfEditable; }

  constructor(private dimCatService: DimensionCategoriesService,
              private activatedRoute: ActivatedRoute,
              private apiService: ApiService,
              public dialog: MatDialog) { }

  ngOnInit() {
      this.view = Views.stats;
      this.initialGet();
  }

  initialGet() {
      if (this.self) {
          this.apiService.getUserProfileMatch().subscribe(response => this.processGetMatch(response));
      } else {
          this.activatedRoute.params.subscribe(params => this.getMatch(params['id']));
      }
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
      this.finishedEditing();
      this.editing = field;
      switch (field) {
          case SelfEditable.preferred_name: this.editText = this.match.preferred_name;
            window.setTimeout(() => $('#input_preferred_name').focus() , 50); break;
          case SelfEditable.contact: this.editText = this.match.contact;
              window.setTimeout(() => $('#input_contact').focus() , 50); break;
          case SelfEditable.birthday: this.editText = this.match.birthday;
              window.setTimeout(() => $('#input_birthday').focus() , 50); break;
          case SelfEditable.bioline: this.editText = this.match.bioline;
              window.setTimeout(() => $('#input_bioline').focus() , 50); break;
          case SelfEditable.bio1: this.editText = this.match.bio1;
              window.setTimeout(() => $('#input_bio1').focus() , 50); break;
          case SelfEditable.bio2: this.editText = this.match.bio2;
              window.setTimeout(() => $('#input_bio2').focus() , 50); break;
          case SelfEditable.bio3: this.editText = this.match.bio3;
              window.setTimeout(() => $('#input_bio3').focus() , 50); break;
      }
  }

  setNYC(nyc: boolean) {
      this.editing = SelfEditable.nyc;
      this.editText = nyc ? '1' : '0';
      this.finishedEditing();
  }

  finishedEditing() {
      let myProfile: object;
      switch (this.editing) {
          case SelfEditable.preferred_name: myProfile = {'preferred_name': this.editText};
              this.match.preferred_name = this.editText; break;
          case SelfEditable.contact: myProfile = {'contact': this.editText};
              this.match.contact = this.editText; break;
          case SelfEditable.birthday: const date = new Date(this.editText);
              myProfile = {'birthday': date.toISOString().substr(0, 10)}; break;
          case SelfEditable.bioline: myProfile = {'bioline': this.editText};
              this.match.bioline = this.editText; break;
          case SelfEditable.nyc: myProfile = {'nyc': this.editText}; break;
          case SelfEditable.bio1: myProfile = {'bio1': this.editText};
              this.match.bio1 = this.editText; break;
          case SelfEditable.bio2: myProfile = {'bio2': this.editText};
              this.match.bio2 = this.editText; break;
          case SelfEditable.bio3: myProfile = {'bio3': this.editText};
              this.match.bio3 = this.editText; break;
          default: myProfile = {}; break;
      }
      if (!this.editFieldValid(myProfile)) {
          return;
      }
      this.apiService.saveProfile(myProfile).subscribe(response => this.processGetMatch(response));
      this.editing = null;
  }

  editFieldValid(submitData?: any) {
      let valid = true;
      let text = this.editText;
      switch (this.editing) {
          case SelfEditable.preferred_name:
              if (submitData) {
                  text = submitData.preferred_name;
              }
              valid = !!text.length;
              break;
          case SelfEditable.birthday:
              if (submitData) {
                  text = submitData.birthday;
              }
              valid = new RegExp('^([12]\\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01]))$').test(text);
              if (!valid) {
                  alert('Please enter birthday with format YYYY-MM-DD. Provide: ' + text);
              }
              break;
          default: valid = true;
      }
      return valid;
  }

  openUploadModal() {
      const dialogRef = this.dialog.open(UploadPictureComponent, {
          height: '400px',
          width: '600px',
      });
      dialogRef.afterClosed().subscribe(result => {
          this.initialGet();
      });
  }

}
