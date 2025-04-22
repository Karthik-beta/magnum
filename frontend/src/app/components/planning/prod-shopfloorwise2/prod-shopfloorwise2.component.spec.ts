import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdShopfloorwise2Component } from './prod-shopfloorwise2.component';

describe('ProdShopfloorwise2Component', () => {
  let component: ProdShopfloorwise2Component;
  let fixture: ComponentFixture<ProdShopfloorwise2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProdShopfloorwise2Component]
    });
    fixture = TestBed.createComponent(ProdShopfloorwise2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
