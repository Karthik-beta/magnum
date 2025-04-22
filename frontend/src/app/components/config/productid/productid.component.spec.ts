import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductidComponent } from './productid.component';

describe('ProductidComponent', () => {
  let component: ProductidComponent;
  let fixture: ComponentFixture<ProductidComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductidComponent]
    });
    fixture = TestBed.createComponent(ProductidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
