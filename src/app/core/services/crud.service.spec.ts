import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { CrudService } from './crud.service';

describe('CrudService', () => {
  let httpTestingController: HttpTestingController;
  let crud: CrudService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CrudService]
    });

    httpTestingController = TestBed.get(HttpTestingController);
    crud = TestBed.get(CrudService);
  });

  it('should be created', () => {
    expect(crud).toBeTruthy();
  });
});
