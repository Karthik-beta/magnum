import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditSoloAssemblylineComponent } from './add-edit-solo-assemblyline.component';

describe('AddEditSoloAssemblylineComponent', () => {
  let component: AddEditSoloAssemblylineComponent;
  let fixture: ComponentFixture<AddEditSoloAssemblylineComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditSoloAssemblylineComponent]
    });
    fixture = TestBed.createComponent(AddEditSoloAssemblylineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
