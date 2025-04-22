import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinePerformanceWiproComponent } from './line-performance-wipro.component';

describe('LinePerformanceWiproComponent', () => {
  let component: LinePerformanceWiproComponent;
  let fixture: ComponentFixture<LinePerformanceWiproComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LinePerformanceWiproComponent]
    });
    fixture = TestBed.createComponent(LinePerformanceWiproComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
