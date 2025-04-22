import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubAssemblylineComponent } from './sub-assemblyline.component';

describe('SubAssemblylineComponent', () => {
  let component: SubAssemblylineComponent;
  let fixture: ComponentFixture<SubAssemblylineComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubAssemblylineComponent]
    });
    fixture = TestBed.createComponent(SubAssemblylineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
