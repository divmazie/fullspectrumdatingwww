import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WordCloudGeneratorComponent } from './word-cloud-generator.component';

describe('WordCloudGeneratorComponent', () => {
  let component: WordCloudGeneratorComponent;
  let fixture: ComponentFixture<WordCloudGeneratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WordCloudGeneratorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WordCloudGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
