import { TestBed, inject } from '@angular/core/testing';

import { MapaService } from './mapa.service';

describe('MapaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MapaService]
    });
  });

  it('should ...', inject([MapaService], (service: MapaService) => {
    expect(service).toBeTruthy();
  }));
});
