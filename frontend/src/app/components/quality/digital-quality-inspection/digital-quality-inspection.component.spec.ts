import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DigitalQualityInspectionComponent } from './digital-quality-inspection.component';

describe('DigitalQualityInspectionComponent', () => {
  let component: DigitalQualityInspectionComponent;
  let fixture: ComponentFixture<DigitalQualityInspectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DigitalQualityInspectionComponent]
    });
    fixture = TestBed.createComponent(DigitalQualityInspectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
