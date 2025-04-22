import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinePlanActualComponent } from './line-plan-actual.component';

describe('LinePlanActualComponent', () => {
  let component: LinePlanActualComponent;
  let fixture: ComponentFixture<LinePlanActualComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LinePlanActualComponent]
    });
    fixture = TestBed.createComponent(LinePlanActualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
