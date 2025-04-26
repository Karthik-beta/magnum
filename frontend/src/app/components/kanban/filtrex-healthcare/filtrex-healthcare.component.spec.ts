import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltrexHealthcareComponent } from './filtrex-healthcare.component';

describe('FiltrexHealthcareComponent', () => {
  let component: FiltrexHealthcareComponent;
  let fixture: ComponentFixture<FiltrexHealthcareComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FiltrexHealthcareComponent]
    });
    fixture = TestBed.createComponent(FiltrexHealthcareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
