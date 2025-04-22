import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdShiftwiseComponent } from './prod-shiftwise.component';

describe('ProdShiftwiseComponent', () => {
  let component: ProdShiftwiseComponent;
  let fixture: ComponentFixture<ProdShiftwiseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProdShiftwiseComponent]
    });
    fixture = TestBed.createComponent(ProdShiftwiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
