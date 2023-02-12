import { TestBed } from '@angular/core/testing';

import { NowPaymnetsService } from './now-paymnets.service';

describe('NowPaymnetsService', () => {
  let service: NowPaymnetsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NowPaymnetsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
