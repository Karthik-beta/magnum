import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssemblylineComponent } from './assemblyline.component';

describe('AssemblylineComponent', () => {
  let component: AssemblylineComponent;
  let fixture: ComponentFixture<AssemblylineComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssemblylineComponent]
    });
    fixture = TestBed.createComponent(AssemblylineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
