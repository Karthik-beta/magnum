import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdAssemblylinewiseComponent } from './prod-assemblylinewise.component';

describe('ProdAssemblylinewiseComponent', () => {
  let component: ProdAssemblylinewiseComponent;
  let fixture: ComponentFixture<ProdAssemblylinewiseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProdAssemblylinewiseComponent]
    });
    fixture = TestBed.createComponent(ProdAssemblylinewiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
