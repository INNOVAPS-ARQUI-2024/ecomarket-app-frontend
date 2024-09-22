import { TestBed } from '@angular/core/testing';

import { EcomarketService } from './ecomarket.service';

describe('EcomarketService', () => {
  let service: EcomarketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EcomarketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
