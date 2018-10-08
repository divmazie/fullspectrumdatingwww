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
        this.apiService.getDimensions()
            .subscribe(response => this.handle_response(response));
    }

    handle_response(response) {
        const _this = this;
        // alert(JSON.stringify(response));
        if (response['status'] === 1) {
            response['data']['dimension_categories'].forEach(function (dim_cat) {
                const newDimCat = {name: dim_cat['name'], id: dim_cat['id'], dimensions: []};
                _this.dim_cats.push(newDimCat);
            });
            response['data']['dimensions'].forEach(function (dim) {
                _this.dim_cats.forEach(function (dim_cat) {
                    if (dim['category'] === dim_cat.id) {
                        const newDim = {name: dim['name'], id: dim['id'], yesNo: 0, slider: 1};
                        dim_cat.dimensions.push(newDim);
                    }
                });
            });
        }
    }

    getVals(event) {
        // console.log(event);
        const dim = this.findDimension(event);
        if (dim !== ({} as Dimension)) {
            dim.yesNo = event.yesNo;
            dim.slider = event.slider;
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
