import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeklyTargetComponent } from './weekly-target.component';

describe('WeeklyTargetComponent', () => {
  let component: WeeklyTargetComponent;
  let fixture: ComponentFixture<WeeklyTargetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WeeklyTargetComponent]
    });
    fixture = TestBed.createComponent(WeeklyTargetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
