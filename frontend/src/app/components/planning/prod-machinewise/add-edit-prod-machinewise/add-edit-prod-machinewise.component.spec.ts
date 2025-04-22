import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditProdMachinewiseComponent } from './add-edit-prod-machinewise.component';

describe('AddEditProdMachinewiseComponent', () => {
  let component: AddEditProdMachinewiseComponent;
  let fixture: ComponentFixture<AddEditProdMachinewiseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditProdMachinewiseComponent]
    });
    fixture = TestBed.createComponent(AddEditProdMachinewiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
