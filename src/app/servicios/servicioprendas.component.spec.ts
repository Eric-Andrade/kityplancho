import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicioprendasComponent } from './servicioprendas.component';

describe('ServicioprendasComponent', () => {
  let component: ServicioprendasComponent;
  let fixture: ComponentFixture<ServicioprendasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicioprendasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicioprendasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
