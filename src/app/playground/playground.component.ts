import { Component, OnInit } from '@angular/core';
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
  selector: 'app-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.css']
})

export class PlaygroundComponent implements OnInit {

    constructor() {}

    identity = true;

    ngOnInit() {}
}
