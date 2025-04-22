import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WiproWorkstationComponent } from './wipro-workstation.component';

describe('WiproWorkstationComponent', () => {
  let component: WiproWorkstationComponent;
  let fixture: ComponentFixture<WiproWorkstationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WiproWorkstationComponent]
    });
    fixture = TestBed.createComponent(WiproWorkstationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
