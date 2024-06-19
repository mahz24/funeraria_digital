import { TestBed } from '@angular/core/testing';

import { BenefactorService } from './benefactor.service';

describe('BenefactorService', () => {
  let service: BenefactorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BenefactorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
