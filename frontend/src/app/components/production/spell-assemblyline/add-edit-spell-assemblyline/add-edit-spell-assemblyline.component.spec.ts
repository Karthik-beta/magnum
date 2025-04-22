import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditSpellAssemblylineComponent } from './add-edit-spell-assemblyline.component';

describe('AddEditSpellAssemblylineComponent', () => {
  let component: AddEditSpellAssemblylineComponent;
  let fixture: ComponentFixture<AddEditSpellAssemblylineComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditSpellAssemblylineComponent]
    });
    fixture = TestBed.createComponent(AddEditSpellAssemblylineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
