import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyTargetComponent } from './daily-target.component';

describe('DailyTargetComponent', () => {
  let component: DailyTargetComponent;
  let fixture: ComponentFixture<DailyTargetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DailyTargetComponent]
    });
    fixture = TestBed.createComponent(DailyTargetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
