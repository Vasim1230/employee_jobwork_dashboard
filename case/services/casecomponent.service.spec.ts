import { TestBed } from '@angular/core/testing';

import { CasecomponentService } from './casecomponent.service';

describe('CasecomponentService', () => {
  let service: CasecomponentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CasecomponentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
