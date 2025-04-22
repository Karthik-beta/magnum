import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdMachinewiseComponent } from './prod-machinewise.component';

describe('ProdMachinewiseComponent', () => {
  let component: ProdMachinewiseComponent;
  let fixture: ComponentFixture<ProdMachinewiseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProdMachinewiseComponent]
    });
    fixture = TestBed.createComponent(ProdMachinewiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
