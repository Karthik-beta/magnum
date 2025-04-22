import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinePlanActualWiproComponent } from './line-plan-actual-wipro.component';

describe('LinePlanActualWiproComponent', () => {
  let component: LinePlanActualWiproComponent;
  let fixture: ComponentFixture<LinePlanActualWiproComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LinePlanActualWiproComponent]
    });
    fixture = TestBed.createComponent(LinePlanActualWiproComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
