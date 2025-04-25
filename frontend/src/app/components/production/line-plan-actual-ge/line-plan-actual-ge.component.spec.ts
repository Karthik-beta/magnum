import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinePlanActualGeComponent } from './line-plan-actual-ge.component';

describe('LinePlanActualGeComponent', () => {
  let component: LinePlanActualGeComponent;
  let fixture: ComponentFixture<LinePlanActualGeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LinePlanActualGeComponent]
    });
    fixture = TestBed.createComponent(LinePlanActualGeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
