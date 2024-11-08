import { TestBed } from '@angular/core/testing';

import { MixedchartsService } from './mixedcharts.service';

describe('MixedchartsService', () => {
  let service: MixedchartsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MixedchartsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
