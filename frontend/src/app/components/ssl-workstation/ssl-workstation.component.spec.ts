import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SslWorkstationComponent } from './ssl-workstation.component';

describe('SslWorkstationComponent', () => {
  let component: SslWorkstationComponent;
  let fixture: ComponentFixture<SslWorkstationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SslWorkstationComponent]
    });
    fixture = TestBed.createComponent(SslWorkstationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
