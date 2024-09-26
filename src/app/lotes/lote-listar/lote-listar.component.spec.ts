import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoteListarComponent } from './lote-listar.component';

describe('LoteListarComponent', () => {
  let component: LoteListarComponent;
  let fixture: ComponentFixture<LoteListarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoteListarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoteListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
