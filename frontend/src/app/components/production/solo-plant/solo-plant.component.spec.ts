import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoloPlantComponent } from './solo-plant.component';

describe('SoloPlantComponent', () => {
  let component: SoloPlantComponent;
  let fixture: ComponentFixture<SoloPlantComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SoloPlantComponent]
    });
    fixture = TestBed.createComponent(SoloPlantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
