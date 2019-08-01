import { TestBed } from '@angular/core/testing';

import { DimensionCategoriesService } from './dimension-categories.service';

describe('DimensionCategoriesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DimensionCategoriesService = TestBed.get(DimensionCategoriesService);
    expect(service).toBeTruthy();
  });
});
