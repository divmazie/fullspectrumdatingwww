import { Component, OnInit } from '@angular/core';

export interface Dimension {
    name: string;
    yesNo: number;
    slider: number;
}

@Component({
  selector: 'app-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.css']
})

export class PlaygroundComponent implements OnInit {
  dims: Dimension[];

    getVals(event) {
        console.log(event);
    }

  constructor() {
      this.dims = [
          {name: 'Masculine', yesNo: 0, slider: 1},
          {name: 'Feminine', yesNo: 1, slider: 4},
          {name: 'Agender', yesNo: -1, slider: 2}
      ];
  }

  ngOnInit() {
  }

}
