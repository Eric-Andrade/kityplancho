import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SucursaldetalleComponent } from './sucursaldetalle.component';

describe('SucursaldetalleComponent', () => {
  let component: SucursaldetalleComponent;
  let fixture: ComponentFixture<SucursaldetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SucursaldetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SucursaldetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
