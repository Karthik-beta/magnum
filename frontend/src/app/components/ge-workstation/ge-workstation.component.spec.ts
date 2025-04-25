import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeWorkstationComponent } from './ge-workstation.component';

describe('GeWorkstationComponent', () => {
  let component: GeWorkstationComponent;
  let fixture: ComponentFixture<GeWorkstationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GeWorkstationComponent]
    });
    fixture = TestBed.createComponent(GeWorkstationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
