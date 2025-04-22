import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiftStrengthComponent } from './shift-strength.component';

describe('ShiftStrengthComponent', () => {
  let component: ShiftStrengthComponent;
  let fixture: ComponentFixture<ShiftStrengthComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShiftStrengthComponent]
    });
    fixture = TestBed.createComponent(ShiftStrengthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
