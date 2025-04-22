import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QcDefectTypeComponent } from './qc-defect-type.component';

describe('QcDefectTypeComponent', () => {
  let component: QcDefectTypeComponent;
  let fixture: ComponentFixture<QcDefectTypeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QcDefectTypeComponent]
    });
    fixture = TestBed.createComponent(QcDefectTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
