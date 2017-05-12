import { TestBed, inject } from '@angular/core/testing';

import { SucursalesService } from './sucursales.service';

describe('SucursalesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SucursalesService]
    });
  });

  it('should ...', inject([SucursalesService], (service: SucursalesService) => {
    expect(service).toBeTruthy();
  }));
});
