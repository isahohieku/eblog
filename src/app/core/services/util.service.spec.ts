import { TestBed } from '@angular/core/testing';

import { UtilService } from './util.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('UtilService', () => {
  let httpTestingController: HttpTestingController;
  let util: UtilService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UtilService]
    });

    httpTestingController = TestBed.get(HttpTestingController);
    util = TestBed.get(UtilService);
  });

  it('should be created', () => {
    expect(util).toBeTruthy();
  });
});
