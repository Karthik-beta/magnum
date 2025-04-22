import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinePerformanceFiltrexComponent } from './line-performance-filtrex.component';

describe('LinePerformanceFiltrexComponent', () => {
  let component: LinePerformanceFiltrexComponent;
  let fixture: ComponentFixture<LinePerformanceFiltrexComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LinePerformanceFiltrexComponent]
    });
    fixture = TestBed.createComponent(LinePerformanceFiltrexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
