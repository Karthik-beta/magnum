import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdPlantwiseComponent } from './prod-plantwise.component';

describe('ProdPlantwiseComponent', () => {
  let component: ProdPlantwiseComponent;
  let fixture: ComponentFixture<ProdPlantwiseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProdPlantwiseComponent]
    });
    fixture = TestBed.createComponent(ProdPlantwiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
