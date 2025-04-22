import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QualityManagementReportComponent } from './quality-management-report.component';

describe('QualityManagementReportComponent', () => {
  let component: QualityManagementReportComponent;
  let fixture: ComponentFixture<QualityManagementReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QualityManagementReportComponent]
    });
    fixture = TestBed.createComponent(QualityManagementReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
