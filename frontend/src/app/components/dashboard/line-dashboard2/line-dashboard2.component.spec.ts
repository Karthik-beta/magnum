import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineDashboard2Component } from './line-dashboard2.component';

describe('LineDashboard2Component', () => {
  let component: LineDashboard2Component;
  let fixture: ComponentFixture<LineDashboard2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LineDashboard2Component]
    });
    fixture = TestBed.createComponent(LineDashboard2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
