import { TestBed } from '@angular/core/testing';

import { EpaycoService } from './epayco.service';

describe('EpaycoService', () => {
  let service: EpaycoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EpaycoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
