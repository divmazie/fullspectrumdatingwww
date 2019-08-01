import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {Dimension} from '../dimensions-ui/dimensions-ui.component';
import {DimensionCategoriesService} from '../dimension-categories.service';

export interface Match {
    preferred_name: string;
    profile_id: number;
}
export interface MatchDim {
    dimension: Dimension;
    match_value: number;
    not: boolean;
}

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css']
})
export class MatchComponent implements OnInit, OnChanges {
    @Input() match: Match;
    @Input() theyLikeYou: MatchDim[];
    @Input() youLikeThem: MatchDim[];
    @Input() youNotLikeThem: MatchDim[];

  constructor(private dimCatService: DimensionCategoriesService) { }

  ngOnInit() {
  }

  ngOnChanges(changes) {
      this.theyLikeYou = this.theyLikeYou.sort((n1, n2) => n2.match_value - n1.match_value);
      this.youLikeThem = this.youLikeThem.sort((n1, n2) => n2.match_value - n1.match_value);
      this.youNotLikeThem = this.youNotLikeThem.sort((n1, n2) => n1.match_value - n2.match_value);
      // alert(JSON.stringify(this.youLikeThem));
  }

  matchDimString(matchDim: MatchDim) {
    if (matchDim.not) {
      return 'Not ' + matchDim.dimension.name.toLowerCase();
    } else {
      return matchDim.dimension.name;
    }
  }

  getDimCatColor(id: number) {
    return this.dimCatService.getColor(id);
  }

}
