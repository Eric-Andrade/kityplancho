import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrendadetalleComponent } from './prendadetalle.component';

describe('PrendadetalleComponent', () => {
  let component: PrendadetalleComponent;
  let fixture: ComponentFixture<PrendadetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrendadetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrendadetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
