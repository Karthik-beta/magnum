import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoNoComponent } from './po-no.component';

describe('PoNoComponent', () => {
  let component: PoNoComponent;
  let fixture: ComponentFixture<PoNoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PoNoComponent]
    });
    fixture = TestBed.createComponent(PoNoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
