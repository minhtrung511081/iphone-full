import { TestBed } from '@angular/core/testing';

import { UsernewService } from './usernew.service';

describe('UsernewService', () => {
  let service: UsernewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsernewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
