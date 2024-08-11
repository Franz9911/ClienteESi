import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoteRegistrarComponent } from './lote-registrar.component';

describe('LoteRegistrarComponent', () => {
  let component: LoteRegistrarComponent;
  let fixture: ComponentFixture<LoteRegistrarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoteRegistrarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoteRegistrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
