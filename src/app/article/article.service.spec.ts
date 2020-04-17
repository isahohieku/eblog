import { TestBed } from '@angular/core/testing';

import { ArticleService } from './article.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { mockArticleResponse, mockCommentsResponse, mockArticle, mockArticlesResponse } from '../shared/util/mock-user';

describe('ArticleService', () => {
  let httpTestingController: HttpTestingController;
  let crud: ArticleService;

  const baseUrl = 'https://eblog-api.encentrals.com/api/';
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ArticleService]
    });

    httpTestingController = TestBed.get(HttpTestingController);
    crud = TestBed.get(ArticleService);
  });

  it('should be created', () => {
    const service: ArticleService = TestBed.get(ArticleService);
    expect(service).toBeTruthy();
  });

  it('should get article', () => {
    const url = 'articles/hello-world';
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

  it('should get articles', () => {
    const url = 'articles';
    crud.getArticle(url).subscribe(res => {
      expect(res).toEqual(mockArticlesResponse);
    });

    const req = httpTestingController.expectOne({
      method: 'GET',
      url: `${baseUrl}${url}`
    });
    req.flush(mockArticlesResponse);
    httpTestingController.verify();
  });

  it('should get comments', () => {
    const url = 'articles/hello-world/comments';
    crud.getComments(url).subscribe(res => {
      expect(res).toEqual(mockCommentsResponse);
    });

    const req = httpTestingController.expectOne({
      method: 'GET',
      url: `${baseUrl}${url}`
    });
    req.flush(mockCommentsResponse);
    httpTestingController.verify();
  });

  it('should delete article', () => {
    const url = 'articles/hello-world/';
    crud.deleteArticle(url).subscribe(res => {
      expect(res).toEqual(mockArticleResponse);
    });

    const req = httpTestingController.expectOne({
      method: 'DELETE',
      url: `${baseUrl}${url}`
    });
    req.flush(mockArticleResponse);
    httpTestingController.verify();
  });

  it('should unfavorite article', () => {
    const url = 'articles/hello-world/favorite';
    crud.unFavouriteArticle(url).subscribe(res => {
      expect(res).toEqual(mockArticleResponse);
    });

    const req = httpTestingController.expectOne({
      method: 'DELETE',
      url: `${baseUrl}${url}`
    });
    req.flush(mockArticleResponse);
    httpTestingController.verify();
  });

  it('should favorite article', () => {
    const url = 'articles/hello-world/favorite';
    crud.favouriteArticle(url, mockArticle).subscribe(res => {
      expect(res).toEqual(mockArticleResponse);
    });

    const req = httpTestingController.expectOne({
      method: 'POST',
      url: `${baseUrl}${url}`
    });
    req.flush(mockArticleResponse);
    httpTestingController.verify();
  });
});
