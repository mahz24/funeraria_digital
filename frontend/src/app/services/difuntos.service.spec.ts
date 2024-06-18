import { TestBed } from '@angular/core/testing';

import { DifuntosService } from './difuntos.service';

describe('DifuntosService', () => {
  let service: DifuntosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DifuntosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
