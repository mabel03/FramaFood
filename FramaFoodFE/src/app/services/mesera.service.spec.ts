import { TestBed } from '@angular/core/testing';

import { MeseraService } from './mesera.service';

describe('MeseraService', () => {
  let service: MeseraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MeseraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
