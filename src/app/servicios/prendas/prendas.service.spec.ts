import { TestBed, inject } from '@angular/core/testing';

import { PrendasService } from './prendas.service';

describe('PrendasService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PrendasService]
    });
  });

  it('should ...', inject([PrendasService], (service: PrendasService) => {
    expect(service).toBeTruthy();
  }));
});
