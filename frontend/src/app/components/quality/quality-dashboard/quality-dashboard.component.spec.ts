import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QualityDashboardComponent } from './quality-dashboard.component';

describe('QualityDashboardComponent', () => {
  let component: QualityDashboardComponent;
  let fixture: ComponentFixture<QualityDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QualityDashboardComponent]
    });
    fixture = TestBed.createComponent(QualityDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
