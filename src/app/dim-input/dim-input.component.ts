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
  @Input() color: string;
  @Input() yesNoVal: number;
  @Input() sliderVal: number;
  @Input() preferences: boolean;
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
          step: 0.1,
          animate: 'fast',
          value: this.sliderVal,
          slide: this.sliderChange.bind(this),
          change: this.sliderChange.bind(this)
      });
  }

  sliderChange(event) {
      this.sliderVal = Number.parseFloat($( '#' + this.id ).slider('value'));
      this.notifyParent();
  }

  notifyParent() {
      this.change.emit({dimName: this.dimName, yesNo: this.yesNoVal, slider: this.sliderVal});
  }

  setYesNo(value) {
      if (this.yesNoVal === value) {
          this.yesNoVal = 0;
      } else {
          this.yesNoVal = value;
      }
      this.notifyParent();
  }

}
