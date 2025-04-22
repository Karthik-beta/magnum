import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdPlanReportComponent } from './prod-plan-report.component';

describe('ProdPlanReportComponent', () => {
  let component: ProdPlanReportComponent;
  let fixture: ComponentFixture<ProdPlanReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProdPlanReportComponent]
    });
    fixture = TestBed.createComponent(ProdPlanReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
