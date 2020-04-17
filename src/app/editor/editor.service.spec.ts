import { TestBed } from '@angular/core/testing';

import { EditorService } from './editor.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { mockArticleResponse, mockArticle } from '../shared/util/mock-user';

describe('EditorService', () => {
  let httpTestingController: HttpTestingController;
  let crud: EditorService;

  const baseUrl = 'https://eblog-api.encentrals.com/api/';
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EditorService]
    });

    httpTestingController = TestBed.get(HttpTestingController);
    crud = TestBed.get(EditorService);
  });

  it('should be created', () => {
    const service: EditorService = TestBed.get(EditorService);
    expect(service).toBeTruthy();
  });

  it('should get article', () => {
    const url = 'article/hello-world';
    crud.getArticle(url).subscribe(res => {
      expect(res).toEqual(mockArticleResponse);
    });

    const req = httpTestingController.expectOne({
      method: 'GET',
      url: `${baseUrl}${url}`
    });
    req.flush(mockArticleResponse);
    httpTestingController.verify();
  });

  it('should add article', () => {
    const url = 'article/hello-world';
    crud.addArticle(url, mockArticle).subscribe(res => {
      expect(res).toEqual(mockArticleResponse);
    });

    const req = httpTestingController.expectOne({
      method: 'POST',
      url: `${baseUrl}${url}`
    });
    req.flush(mockArticleResponse);
    httpTestingController.verify();
  });

  it('should update article', () => {
    const url = 'article/hello-world';
    crud.updateArticle(url, mockArticle).subscribe(res => {
      expect(res).toEqual(mockArticleResponse);
    });

    const req = httpTestingController.expectOne({
      method: 'PUT',
      url: `${baseUrl}${url}`
    });
    req.flush(mockArticleResponse);
    httpTestingController.verify();
  });
});
