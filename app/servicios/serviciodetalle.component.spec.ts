import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiciodetalleComponent } from './serviciodetalle.component';

describe('ServiciodetalleComponent', () => {
  let component: ServiciodetalleComponent;
  let fixture: ComponentFixture<ServiciodetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiciodetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiciodetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
