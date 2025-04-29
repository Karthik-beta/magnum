import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LTWorkstationComponent } from './lt-workstation.component';

describe('LTWorkstationComponent', () => {
  let component: LTWorkstationComponent;
  let fixture: ComponentFixture<LTWorkstationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LTWorkstationComponent]
    });
    fixture = TestBed.createComponent(LTWorkstationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
