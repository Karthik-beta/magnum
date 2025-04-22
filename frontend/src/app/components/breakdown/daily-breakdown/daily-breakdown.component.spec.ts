import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyBreakdownComponent } from './daily-breakdown.component';

describe('DailyBreakdownComponent', () => {
  let component: DailyBreakdownComponent;
  let fixture: ComponentFixture<DailyBreakdownComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DailyBreakdownComponent]
    });
    fixture = TestBed.createComponent(DailyBreakdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
