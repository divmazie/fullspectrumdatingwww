import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ApiService} from '../api.service';
import {forEach} from '@angular/router/src/utils/collection';
import {st} from '@angular/core/src/render3';
import {DimensionCategoriesService} from '../dimension-categories.service';

export interface Dimension {
    name: string;
    id: number;
    yesNo: number;
    slider: number;
    defaultOrder: number;
    category_values?: DimensionCategory;
}
export interface DimensionCategory {
    name: string;
    id: number;
    dimensions: Dimension[];
    color: string;
}

declare var $: any;

@Component({
  selector: 'app-dimensions-ui',
  templateUrl: './dimensions-ui.component.html',
  styleUrls: ['./dimensions-ui.component.css']
})
export class DimensionsUiComponent implements OnInit {
    @Input() preferences: boolean;
    @Input() newProfile?: boolean;
    @Input() showOnly?: number;
    @Input() hideCategories?: number[];
    dim_cats: DimensionCategory[];
    visible_cat: number;
    showMoreCutoff = 10;
    showMore = false;
    @Output() categoryClick = new EventEmitter<Object>();

    constructor(private apiService: ApiService, private dimCatService: DimensionCategoriesService) {
        this.dim_cats = [];
        this.visible_cat = -1;
    }

    ngOnInit() {
        this.dim_cats = [];
        if (!this.preferences) {
            this.apiService.getIdentities()
                .subscribe(response => this.handle_response(response, this.showOnly));
        } else {
            this.apiService.getPreferences()
                .subscribe(response => this.handle_response(response, this.showOnly));
        }
    }

    handle_response(response, showOnly?) {
        const _this = this;
        if (response['resource'][1] === 'get-identities'
            || response['resource'][1] === 'get-preferences') {
            if (response['status'] === 1) {
                response['data']['dimension_categories'].forEach(function (dim_cat) {
                    const newDimCat = {name: dim_cat['name'], id: dim_cat['id'], dimensions: [], color: dim_cat['color']};
                    _this.dim_cats.push(newDimCat);
                });
                if (!this.dimCatService.categories) {
                    this.dimCatService.setCategories(this.dim_cats);
                }
                response['data'][this.preferences ? 'preferences' : 'identities'].forEach(function (dim) {
                    _this.dim_cats.forEach(function (dim_cat) {
                        if (dim['dimension_id_values']['category'] === dim_cat.id) {
                            const newDim = {
                                name: dim['dimension_id_values']['name'],
                                id: dim['id'],
                                dimension_id: dim['dimension_id_values']['id'],
                                yesNo: dim['yesNo'],
                                slider: dim['slider'],
                                defaultOrder: dim['dimension_id_values']['default_order']
                            };
                            if (!dim_cat.dimensions.find((element) => element.id === newDim.id)) {
                                dim_cat.dimensions.push(newDim);
                            }
                        }
                        dim_cat.dimensions = dim_cat.dimensions.sort(function(n1, n2) {
                            if (n1.yesNo === 0 && n2.yesNo === 0) {
                                return n1.defaultOrder - n2.defaultOrder;
                            } else if (n1.yesNo === 0) {
                                return 1;
                            } else if (n2.yesNo === 0) {
                                return -1;
                            } else {
                                return n2.slider - n1.slider;
                            }
                        });
                    });
                });
                if (this.newProfile && showOnly) {
                    this.showCategory(this.showOnly);
                }
            }
        }
    }

    categoryHidden(cat) {
        return (this.hideCategories && this.hideCategories.indexOf(cat.id) > -1);
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
            if (this.newProfile) {
                this.categoryClick.emit({id: id});
                const hideCategories = this.hideCategories;
                this.dim_cats.forEach(function (cat) {
                    if (cat.id !== id) {
                        hideCategories.push(cat.id);
                    }
                });
            }
            setTimeout(function () { _this.scrollToId(id); }, 50);
        }
        this.showMore = false;
    }

    scrollToId(id) {
        $('html, body').animate({
            scrollTop: $('#dim_cat_' + id).offset().top
        }, 200);
    }

    trackByDims(index, element) {
        return element ? element.name : undefined;
    }

}
