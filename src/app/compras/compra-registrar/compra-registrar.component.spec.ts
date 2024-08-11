import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompraRegistrarComponent } from './compra-registrar.component';

describe('CompraRegistrarComponent', () => {
  let component: CompraRegistrarComponent;
  let fixture: ComponentFixture<CompraRegistrarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompraRegistrarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompraRegistrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
