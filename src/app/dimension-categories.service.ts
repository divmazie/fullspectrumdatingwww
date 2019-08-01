import { Injectable } from '@angular/core';
import {DimensionCategory} from './dimensions-ui/dimensions-ui.component';

@Injectable({
  providedIn: 'root'
})
export class DimensionCategoriesService {
  categories: DimensionCategory[];

  constructor() {
    this.categories = [];
  }

  setCategories(categories: DimensionCategory[]) {
    categories.forEach((cat) => {
      this.categories[cat.id] = cat;
    });
  }

  getColor(id: number) {
    return this.categories[id].color;
  }
}
