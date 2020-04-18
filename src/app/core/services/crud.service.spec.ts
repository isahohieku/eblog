import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { CrudService } from './crud.service';
import { mockArticleResponse, mockArticle } from 'src/app/shared/util/mock-user';
import { ToastrService, ToastrModule } from 'ngx-toastr';

describe('CrudService', () => {
  let httpTestingController: HttpTestingController;
  let crud: CrudService;

  const baseUrl = 'https://eblog-api.encentrals.com/api/';
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ToastrModule.forRoot()],
      providers: [CrudService, ToastrService]
    });

    httpTestingController = TestBed.get(HttpTestingController);
    crud = TestBed.get(CrudService);
  });

  it('should be created', () => {
    expect(crud).toBeTruthy();
  });

  it('should get resource', () => {
    const url = 'articles/hello-world';
    crud.getResource(url).subscribe(res => {
      expect(res).toEqual(mockArticleResponse);
    });

    const req = httpTestingController.expectOne({
      method: 'GET',
      url: `${baseUrl}${url}`
    });
    req.flush(mockArticleResponse);
    httpTestingController.verify();
  });

  it('should post resource', () => {
    const url = 'articles/hello-world';
    crud.postResource(url, mockArticle).subscribe(res => {
      expect(res).toEqual(mockArticleResponse);
    });

    const req = httpTestingController.expectOne({
      method: 'POST',
      url: `${baseUrl}${url}`
    });
    req.flush(mockArticleResponse);
    httpTestingController.verify();
  });

  it('should update resource', () => {
    const url = 'articles/hello-world';
    crud.updateResource(url, mockArticle).subscribe(res => {
      expect(res).toEqual(mockArticleResponse);
    });

    const req = httpTestingController.expectOne({
      method: 'PUT',
      url: `${baseUrl}${url}`
    });
    req.flush(mockArticleResponse);
    httpTestingController.verify();
  });

  it('should delete resource', () => {
    const url = 'articles/hello-world/id';
    crud.deleteResource(url).subscribe(res => {
      expect(res).toEqual(mockArticleResponse);
    });

    const req = httpTestingController.expectOne({
      method: 'DELETE',
      url: `${baseUrl}${url}`
    });
    req.flush(mockArticleResponse);
    httpTestingController.verify();
  });
});
