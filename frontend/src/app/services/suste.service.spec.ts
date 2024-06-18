import { TestBed } from '@angular/core/testing';

import { SusteService } from './suste.service';

describe('SusteService', () => {
  let service: SusteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SusteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
