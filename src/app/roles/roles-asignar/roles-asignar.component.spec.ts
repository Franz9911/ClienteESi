import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolesAsignarComponent } from './roles-asignar.component';

describe('RolesAsignarComponent', () => {
  let component: RolesAsignarComponent;
  let fixture: ComponentFixture<RolesAsignarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RolesAsignarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RolesAsignarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
