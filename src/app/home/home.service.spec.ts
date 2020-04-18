import { TestBed } from '@angular/core/testing';

import { HomeService } from './home.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { mockArticlesResponse } from '../shared/util/mock-user';

describe('HomeService', () => {
  let httpTestingController: HttpTestingController;
  let crud: HomeService;

  const baseUrl = 'https://eblog-api.encentrals.com/api/';
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HomeService]
    });

    httpTestingController = TestBed.get(HttpTestingController);
    crud = TestBed.get(HomeService);
  });

  it('should be created', () => {
    const service: HomeService = TestBed.get(HomeService);
    expect(service).toBeTruthy();
  });

  it('should get articles', () => {
    const url = 'articles';
    crud.getArticles(url).subscribe(res => {
      expect(res).toEqual(mockArticlesResponse);
    });

    const req = httpTestingController.expectOne({
      method: 'GET',
      url: `${baseUrl}${url}`
    });
    req.flush(mockArticlesResponse);
    httpTestingController.verify();
  });

  it('should get articles feeds', () => {
    const url = 'articles';
    crud.getArticlesFeed(url).subscribe(res => {
      expect(res).toEqual(mockArticlesResponse);
    });

    const req = httpTestingController.expectOne({
      method: 'GET',
      url: `${baseUrl}${url}`
    });
    req.flush(mockArticlesResponse);
    httpTestingController.verify();
  });
});
