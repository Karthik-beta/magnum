import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayBoardComponent } from './display-board.component';

describe('DisplayBoardComponent', () => {
  let component: DisplayBoardComponent;
  let fixture: ComponentFixture<DisplayBoardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DisplayBoardComponent]
    });
    fixture = TestBed.createComponent(DisplayBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
