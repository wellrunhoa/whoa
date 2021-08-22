import { TestBed } from '@angular/core/testing';

import { ServiceReqService } from './service-req.service';

describe('ServiceReqService', () => {
  let service: ServiceReqService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceReqService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
