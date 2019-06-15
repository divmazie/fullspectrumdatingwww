import {Component, Input, OnInit} from '@angular/core';
import {ApiService} from '../api.service';
import {forEach} from '@angular/router/src/utils/collection';

export interface Dimension {
    name: string;
    id: number;
    yesNo: number;
    slider: number;
}
export interface DimensionCategory {
    name: string;
    id: number;
    dimensions: Dimension[];
}

declare var $: any;

@Component({
  selector: 'app-dimensions-ui',
  templateUrl: './dimensions-ui.component.html',
  styleUrls: ['./dimensions-ui.component.css']
})
export class DimensionsUiComponent implements OnInit {
    @Input() preferences: boolean;
    dim_cats: DimensionCategory[];
    visible_cat: number;

    constructor(private apiService: ApiService) {
        this.dim_cats = [];
        this.visible_cat = -1;
    }

    ngOnInit() {
        if (!this.preferences) {
            this.apiService.getIdentities()
                .subscribe(response => this.handle_response(response));
        } else {
            this.apiService.getPreferences()
                .subscribe(response => this.handle_response(response));
        }
    }

    handle_response(response) {
        const _this = this;
        // alert(JSON.stringify(response['data']['identities']));
        // alert(JSON.stringify(response['resource']));
        if (response['resource'][1] === 'get-identities'
            || response['resource'][1] === 'get-preferences') {
            if (response['status'] === 1) {
                response['data']['dimension_categories'].forEach(function (dim_cat) {
                    const newDimCat = {name: dim_cat['name'], id: dim_cat['id'], dimensions: []};
                    _this.dim_cats.push(newDimCat);
                });
                response['data'][this.preferences ? 'preferences' : 'identities'].forEach(function (dim) {
                    _this.dim_cats.forEach(function (dim_cat) {
                        if (dim['dimension_id_values']['category'] === dim_cat.id) {
                            const newDim = {
                                name: dim['dimension_id_values']['name'],
                                id: dim['id'],
                                dimension_id: dim['dimension_id_values']['id'],
                                yesNo: dim['yesNo'],
                                slider: dim['slider']
                            };
                            dim_cat.dimensions.push(newDim);
                        }
                    });
                });
            }
        }
    }

    getVals(event) {
        const dim = this.findDimension(event);
        if (dim !== ({} as Dimension)) {
            dim.yesNo = event.yesNo;
            dim.slider = event.slider;
        }
        console.log(dim);
        if (!this.preferences) {
            this.apiService.saveIdentity(dim)
                .subscribe(response => this.handle_response(response));
        } else {
            this.apiService.savePreference(dim)
                .subscribe(response => this.handle_response(response));
        }
    }

    findDimension(needle) {
        let return_val = {} as Dimension;
        this.dim_cats.forEach(function (dim_cat) {
            dim_cat.dimensions.forEach(function (dim) {
                if (dim.name === needle.dimName) {
                    return_val = dim as Dimension;
                }
            });
        });
        return return_val;
    }

    showCategory(id) {
        if (this.visible_cat === id) {
            this.visible_cat = -1;
        } else {
            this.visible_cat = id;
            const _this = this;
            setTimeout(function () { _this.scrollToId(id); }, 50);
        }
    }

    scrollToId(id) {
        $('html, body').animate({
            scrollTop: $('#dim_cat_' + id).offset().top
        }, 200);
    }

}
