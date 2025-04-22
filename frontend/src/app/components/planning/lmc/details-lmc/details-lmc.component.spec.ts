import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsLmcComponent } from './details-lmc.component';

describe('DetailsLmcComponent', () => {
  let component: DetailsLmcComponent;
  let fixture: ComponentFixture<DetailsLmcComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailsLmcComponent]
    });
    fixture = TestBed.createComponent(DetailsLmcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
