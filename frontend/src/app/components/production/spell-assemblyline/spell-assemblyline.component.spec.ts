import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpellAssemblylineComponent } from './spell-assemblyline.component';

describe('SpellAssemblylineComponent', () => {
  let component: SpellAssemblylineComponent;
  let fixture: ComponentFixture<SpellAssemblylineComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SpellAssemblylineComponent]
    });
    fixture = TestBed.createComponent(SpellAssemblylineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
