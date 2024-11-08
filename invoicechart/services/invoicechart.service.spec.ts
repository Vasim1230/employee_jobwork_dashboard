import { TestBed } from '@angular/core/testing';

import { InvoicechartService } from './invoicechart.service';

describe('InvoicechartService', () => {
  let service: InvoicechartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvoicechartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
