import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinePlanActualFiltrexComponent } from './line-plan-actual-filtrex.component';

describe('LinePlanActualFiltrexComponent', () => {
  let component: LinePlanActualFiltrexComponent;
  let fixture: ComponentFixture<LinePlanActualFiltrexComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LinePlanActualFiltrexComponent]
    });
    fixture = TestBed.createComponent(LinePlanActualFiltrexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
