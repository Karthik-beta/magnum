import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoloShopfloorComponent } from './solo-shopfloor.component';

describe('SoloShopfloorComponent', () => {
  let component: SoloShopfloorComponent;
  let fixture: ComponentFixture<SoloShopfloorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SoloShopfloorComponent]
    });
    fixture = TestBed.createComponent(SoloShopfloorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
