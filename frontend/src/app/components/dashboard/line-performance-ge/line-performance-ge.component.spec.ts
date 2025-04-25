import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinePerformanceGeComponent } from './line-performance-ge.component';

describe('LinePerformanceGeComponent', () => {
  let component: LinePerformanceGeComponent;
  let fixture: ComponentFixture<LinePerformanceGeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LinePerformanceGeComponent]
    });
    fixture = TestBed.createComponent(LinePerformanceGeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
