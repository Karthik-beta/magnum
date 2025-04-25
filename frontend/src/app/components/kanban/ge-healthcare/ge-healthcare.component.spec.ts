import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeHealthcareComponent } from './ge-healthcare.component';

describe('GeHealthcareComponent', () => {
  let component: GeHealthcareComponent;
  let fixture: ComponentFixture<GeHealthcareComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GeHealthcareComponent]
    });
    fixture = TestBed.createComponent(GeHealthcareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
