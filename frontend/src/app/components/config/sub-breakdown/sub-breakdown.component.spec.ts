import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubBreakdownComponent } from './sub-breakdown.component';

describe('SubBreakdownComponent', () => {
  let component: SubBreakdownComponent;
  let fixture: ComponentFixture<SubBreakdownComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubBreakdownComponent]
    });
    fixture = TestBed.createComponent(SubBreakdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
