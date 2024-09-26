import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProveedorRegistrarComponent } from './proveedor-registrar.component';

describe('ProveedorRegistrarComponent', () => {
  let component: ProveedorRegistrarComponent;
  let fixture: ComponentFixture<ProveedorRegistrarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProveedorRegistrarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProveedorRegistrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
