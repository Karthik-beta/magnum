import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdShopfloorwiseComponent } from './prod-shopfloorwise.component';

describe('ProdShopfloorwiseComponent', () => {
  let component: ProdShopfloorwiseComponent;
  let fixture: ComponentFixture<ProdShopfloorwiseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProdShopfloorwiseComponent]
    });
    fixture = TestBed.createComponent(ProdShopfloorwiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
