import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MachinewiseAnalysisComponent } from './machinewise-analysis.component';

describe('MachinewiseAnalysisComponent', () => {
  let component: MachinewiseAnalysisComponent;
  let fixture: ComponentFixture<MachinewiseAnalysisComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MachinewiseAnalysisComponent]
    });
    fixture = TestBed.createComponent(MachinewiseAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
