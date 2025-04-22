import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinePerformanceComponent } from './line-performance.component';

describe('LinePerformanceComponent', () => {
  let component: LinePerformanceComponent;
  let fixture: ComponentFixture<LinePerformanceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LinePerformanceComponent]
    });
    fixture = TestBed.createComponent(LinePerformanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
