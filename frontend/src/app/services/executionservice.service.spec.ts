import { TestBed } from '@angular/core/testing';

import { ExecutionserviceService } from './executionservice.service';

describe('ExecutionserviceService', () => {
  let service: ExecutionserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExecutionserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
