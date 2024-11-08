import { TestBed } from '@angular/core/testing';

import { ProjectmanageService } from '../../services/projectmanage.service';

describe('ProjectmanageService', () => {
  let service: ProjectmanageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectmanageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
