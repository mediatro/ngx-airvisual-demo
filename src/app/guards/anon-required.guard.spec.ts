import { TestBed } from '@angular/core/testing';

import { AnonRequiredGuard } from './anon-required.guard';

describe('AnonRequiredGuard', () => {
  let guard: AnonRequiredGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AnonRequiredGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
