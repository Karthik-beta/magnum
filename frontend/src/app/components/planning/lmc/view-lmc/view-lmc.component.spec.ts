import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewLmcComponent } from './view-lmc.component';

describe('ViewLmcComponent', () => {
  let component: ViewLmcComponent;
  let fixture: ComponentFixture<ViewLmcComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewLmcComponent]
    });
    fixture = TestBed.createComponent(ViewLmcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
