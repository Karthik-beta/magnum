import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdStatsComponent } from './prod-stats.component';

describe('ProdStatsComponent', () => {
  let component: ProdStatsComponent;
  let fixture: ComponentFixture<ProdStatsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProdStatsComponent]
    });
    fixture = TestBed.createComponent(ProdStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
