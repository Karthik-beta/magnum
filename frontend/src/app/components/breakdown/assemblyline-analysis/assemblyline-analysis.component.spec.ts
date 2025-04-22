import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssemblylineAnalysisComponent } from './assemblyline-analysis.component';

describe('AssemblylineAnalysisComponent', () => {
  let component: AssemblylineAnalysisComponent;
  let fixture: ComponentFixture<AssemblylineAnalysisComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssemblylineAnalysisComponent]
    });
    fixture = TestBed.createComponent(AssemblylineAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
