import { TestBed } from '@angular/core/testing';

import { UsertimesheetService } from './usertimesheet.service';

describe('UsertimesheetService', () => {
  let service: UsertimesheetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsertimesheetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
