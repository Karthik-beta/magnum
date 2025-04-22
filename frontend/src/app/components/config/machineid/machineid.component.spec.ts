import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MachineidComponent } from './machineid.component';

describe('MachineidComponent', () => {
  let component: MachineidComponent;
  let fixture: ComponentFixture<MachineidComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MachineidComponent]
    });
    fixture = TestBed.createComponent(MachineidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
