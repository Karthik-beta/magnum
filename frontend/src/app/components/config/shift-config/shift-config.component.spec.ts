import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiftConfigComponent } from './shift-config.component';

describe('ShiftConfigComponent', () => {
  let component: ShiftConfigComponent;
  let fixture: ComponentFixture<ShiftConfigComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShiftConfigComponent]
    });
    fixture = TestBed.createComponent(ShiftConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
