import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { UtilService } from '../core/services/util.service';
import { Observable } from 'rxjs';
import { share, map, catchError } from 'rxjs/operators';
import { ArticleResponse } from '../core/models/article';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private header: { headers: HttpHeaders; };

  constructor(
    private http: HttpClient,
    private util: UtilService
  ) {
    this.header = {
      headers: new HttpHeaders()
    };
  }

  getArticle(url): Observable<any> {
    return this.http.get(`${this.util.baseUrl}${url}`, this.header)
      .pipe(
        map(res => res)
      );
  }

  getArticles(url): Observable<any> {
    return this.http.get(`${this.util.baseUrl}${url}`, this.header)
      .pipe(
        map(res => res)
      );
  }

  getArticlesFeed(url): Observable<any> {
    return this.http.get(`${this.util.baseUrl}${url}`, this.header)
      .pipe(
        map(res => res)
      );
  }

  getComments(url): Observable<any> {
    return this.http.get(`${this.util.baseUrl}${url}`, this.header)
      .pipe(
        map(res => res)
      );
  }

  deleteArticle(url): Observable<any> {
    return this.http.delete(`${this.util.baseUrl}${url}`, this.header)
      .pipe(
        map(res => res)
      );
  }

  favouriteArticle(url, data): Observable<any> {
    return this.http.post(`${this.util.baseUrl}${url}`, data, this.header)
      .pipe(
        map(res => res)
      );
  }

  unFavouriteArticle(url): Observable<any> {
    return this.http.delete(`${this.util.baseUrl}${url}`, this.header)
      .pipe(
        map(res => res)
      );
  }
}
