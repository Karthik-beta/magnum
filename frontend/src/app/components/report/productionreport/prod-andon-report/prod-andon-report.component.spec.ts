import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdAndonReportComponent } from './prod-andon-report.component';

describe('ProdAndonReportComponent', () => {
  let component: ProdAndonReportComponent;
  let fixture: ComponentFixture<ProdAndonReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProdAndonReportComponent]
    });
    fixture = TestBed.createComponent(ProdAndonReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
