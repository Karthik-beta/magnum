import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MachineDetailQualityComponent } from './machine-detail-quality.component';

describe('MachineDetailQualityComponent', () => {
  let component: MachineDetailQualityComponent;
  let fixture: ComponentFixture<MachineDetailQualityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MachineDetailQualityComponent]
    });
    fixture = TestBed.createComponent(MachineDetailQualityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
