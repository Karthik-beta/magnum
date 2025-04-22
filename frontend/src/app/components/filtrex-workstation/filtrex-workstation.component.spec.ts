import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltrexWorkstationComponent } from './filtrex-workstation.component';

describe('FiltrexWorkstationComponent', () => {
  let component: FiltrexWorkstationComponent;
  let fixture: ComponentFixture<FiltrexWorkstationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FiltrexWorkstationComponent]
    });
    fixture = TestBed.createComponent(FiltrexWorkstationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
