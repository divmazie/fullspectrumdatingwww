import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DimensionsUiComponent } from './dimensions-ui.component';

describe('DimensionsUiComponent', () => {
  let component: DimensionsUiComponent;
  let fixture: ComponentFixture<DimensionsUiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DimensionsUiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DimensionsUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
