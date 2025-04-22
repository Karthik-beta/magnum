import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MachineDashboardComponent } from './machine-dashboard.component';

describe('MachineDashboardComponent', () => {
  let component: MachineDashboardComponent;
  let fixture: ComponentFixture<MachineDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MachineDashboardComponent]
    });
    fixture = TestBed.createComponent(MachineDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
