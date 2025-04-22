import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MachineDetailQuality2Component } from './machine-detail-quality2.component';

describe('MachineDetailQuality2Component', () => {
  let component: MachineDetailQuality2Component;
  let fixture: ComponentFixture<MachineDetailQuality2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MachineDetailQuality2Component]
    });
    fixture = TestBed.createComponent(MachineDetailQuality2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
