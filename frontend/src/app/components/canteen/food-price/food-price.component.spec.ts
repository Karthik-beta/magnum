import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodPriceComponent } from './food-price.component';

describe('FoodPriceComponent', () => {
  let component: FoodPriceComponent;
  let fixture: ComponentFixture<FoodPriceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FoodPriceComponent]
    });
    fixture = TestBed.createComponent(FoodPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
