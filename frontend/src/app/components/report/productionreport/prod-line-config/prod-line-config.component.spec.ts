import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdLineConfigComponent } from './prod-line-config.component';

describe('ProdLineConfigComponent', () => {
  let component: ProdLineConfigComponent;
  let fixture: ComponentFixture<ProdLineConfigComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProdLineConfigComponent]
    });
    fixture = TestBed.createComponent(ProdLineConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
