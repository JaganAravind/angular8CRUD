import { TestBed } from '@angular/core/testing';

import { MockDBService } from './mock-db.service';

describe('MockDBService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MockDBService = TestBed.get(MockDBService);
    expect(service).toBeTruthy();
  });
});
