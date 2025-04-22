import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvacuationComponent } from './evacuation.component';

describe('EvacuationComponent', () => {
  let component: EvacuationComponent;
  let fixture: ComponentFixture<EvacuationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EvacuationComponent]
    });
    fixture = TestBed.createComponent(EvacuationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
