import { TestBed } from '@angular/core/testing';

import { BasictimesheetService } from './basictimesheet.service';

describe('BasictimesheetService', () => {
  let service: BasictimesheetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BasictimesheetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
