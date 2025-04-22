import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QcCheckTypeComponent } from './qc-check-type.component';

describe('QcCheckTypeComponent', () => {
  let component: QcCheckTypeComponent;
  let fixture: ComponentFixture<QcCheckTypeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QcCheckTypeComponent]
    });
    fixture = TestBed.createComponent(QcCheckTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
