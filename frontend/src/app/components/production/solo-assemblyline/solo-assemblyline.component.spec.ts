import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoloAssemblylineComponent } from './solo-assemblyline.component';

describe('SoloAssemblylineComponent', () => {
  let component: SoloAssemblylineComponent;
  let fixture: ComponentFixture<SoloAssemblylineComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SoloAssemblylineComponent]
    });
    fixture = TestBed.createComponent(SoloAssemblylineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
