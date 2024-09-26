import { TestBed } from '@angular/core/testing';

import { RolesAsignarService } from './roles-asignar.service';

describe('RolesAsignarService', () => {
  let service: RolesAsignarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RolesAsignarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
