import { TestBed } from '@angular/core/testing';

import { PlanserviceService } from './planservice.service';

describe('PlanserviceService', () => {
  let service: PlanserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlanserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
