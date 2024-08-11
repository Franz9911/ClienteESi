import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalFormularioProductoLoteComponent } from './modal-formulario-producto-lote.component';

describe('ModalFormularioProductoLoteComponent', () => {
  let component: ModalFormularioProductoLoteComponent;
  let fixture: ComponentFixture<ModalFormularioProductoLoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalFormularioProductoLoteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalFormularioProductoLoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
