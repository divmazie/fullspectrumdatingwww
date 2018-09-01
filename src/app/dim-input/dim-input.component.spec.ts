import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DimInputComponent } from './dim-input.component';

describe('DimInputComponent', () => {
  let component: DimInputComponent;
  let fixture: ComponentFixture<DimInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DimInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DimInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
