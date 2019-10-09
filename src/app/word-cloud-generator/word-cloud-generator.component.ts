import { Component, OnInit } from '@angular/core';
import {ApiService} from '../api.service';

export interface Dim {
  id: number;
  name: string;
  category: number;
  category_values: Category;
  rand_sort?: number;
}

export interface Category {
    id: number;
    name: string;
    color: string;
}

@Component({
  selector: 'app-word-cloud-generator',
  templateUrl: './word-cloud-generator.component.html',
  styleUrls: ['./word-cloud-generator.component.css']
})
export class WordCloudGeneratorComponent implements OnInit {
  dims: Dim[];

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.getDimensions().subscribe(response => {
      if (response['status'] === 1) {
        // alert(JSON.stringify(response['data']));
          this.dims = response['data']['dimensions'];
          this.dims.forEach(dim => {
            dim.rand_sort = Math.random();
          });
          this.dims.sort((n1, n2) => n1.rand_sort - n2.rand_sort);
      }
    });
  }

}
