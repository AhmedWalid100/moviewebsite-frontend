import { TestBed } from '@angular/core/testing';

import { ActorsServiceService } from './actors-service.service';

describe('ActorsServiceService', () => {
  let service: ActorsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActorsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
