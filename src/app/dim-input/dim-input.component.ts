import {Component, Input, Output, EventEmitter, AfterViewInit} from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-dim-input',
  templateUrl: './dim-input.component.html',
  styleUrls: ['./dim-input.component.css']
})
export class DimInputComponent implements AfterViewInit {
  id: string;
  @Input() dimName: string;
  @Input() yesNoVal: number;
  @Input() sliderVal: number;
  @Output() change = new EventEmitter<Object>();

  constructor() {
      this.id = 'dim-input-slider_' + Math.random().toString(36).substr(2, 9);
  }

  ngAfterViewInit() {
      console.log('init');
    this.makeSlider();
  }

  makeSlider() {
      $( '#' + this.id ).slider({
          min: 0,
          max: 10,
          value: this.sliderVal,
          slide: this.sliderChange,
          change: this.sliderChange
      });
  }

  sliderChange() {
      const num = Number.parseFloat($( '#' + this.id ).slider('value'));
      this.sliderVal = num;
      console.log('sliderChange ' + num);
    // this.change.emit({yesNo: this.yesNoVal, slider: this.sliderVal});
  }

}
