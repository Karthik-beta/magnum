import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditLmcComponent } from './add-edit-lmc.component';

describe('AddEditLmcComponent', () => {
  let component: AddEditLmcComponent;
  let fixture: ComponentFixture<AddEditLmcComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditLmcComponent]
    });
    fixture = TestBed.createComponent(AddEditLmcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
