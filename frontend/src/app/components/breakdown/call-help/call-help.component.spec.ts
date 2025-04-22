import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallHelpComponent } from './call-help.component';

describe('CallHelpComponent', () => {
  let component: CallHelpComponent;
  let fixture: ComponentFixture<CallHelpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CallHelpComponent]
    });
    fixture = TestBed.createComponent(CallHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
