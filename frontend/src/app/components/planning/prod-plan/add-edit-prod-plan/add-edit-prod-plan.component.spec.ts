import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditProdPlanComponent } from './add-edit-prod-plan.component';

describe('AddEditProdPlanComponent', () => {
  let component: AddEditProdPlanComponent;
  let fixture: ComponentFixture<AddEditProdPlanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditProdPlanComponent]
    });
    fixture = TestBed.createComponent(AddEditProdPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
