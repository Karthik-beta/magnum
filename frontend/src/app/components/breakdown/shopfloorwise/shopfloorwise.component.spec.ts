import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopfloorwiseComponent } from './shopfloorwise.component';

describe('ShopfloorwiseComponent', () => {
  let component: ShopfloorwiseComponent;
  let fixture: ComponentFixture<ShopfloorwiseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShopfloorwiseComponent]
    });
    fixture = TestBed.createComponent(ShopfloorwiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
