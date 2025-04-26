import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopfloorPlanActualFiltrexComponent } from './shopfloor-plan-actual-filtrex.component';

describe('ShopfloorPlanActualFiltrexComponent', () => {
  let component: ShopfloorPlanActualFiltrexComponent;
  let fixture: ComponentFixture<ShopfloorPlanActualFiltrexComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShopfloorPlanActualFiltrexComponent]
    });
    fixture = TestBed.createComponent(ShopfloorPlanActualFiltrexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
