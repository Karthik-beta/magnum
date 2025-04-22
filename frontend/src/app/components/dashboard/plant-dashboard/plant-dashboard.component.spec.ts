import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantDashboardComponent } from './plant-dashboard.component';

describe('PlantDashboardComponent', () => {
  let component: PlantDashboardComponent;
  let fixture: ComponentFixture<PlantDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlantDashboardComponent]
    });
    fixture = TestBed.createComponent(PlantDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
