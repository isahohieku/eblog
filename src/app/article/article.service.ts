import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { first, map, catchError } from 'rxjs/operators';
import { UtilService } from '../core/services/util.service';
import { HttpErrorService } from '../core/services/http-error.service';


@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private header: { headers: HttpHeaders; };

  constructor(
    private http: HttpClient,
    private errorHandler: HttpErrorService,
    private util: UtilService
  ) {
    this.header = {
      headers: new HttpHeaders()
    };
  }

  getArticle(url): Observable<any> {
    return this.http.get(`${this.util.baseUrl}${url}`, this.header)
      .pipe(
        first(),
        catchError(this.errorHandler.handleError(''))
      );
  }

  getArticles(url): Observable<any> {
    return this.http.get(`${this.util.baseUrl}${url}`, this.header)
      .pipe(
        first(),
        catchError(this.errorHandler.handleError(''))
      );
  }

  getArticlesFeed(url): Observable<any> {
    return this.http.get(`${this.util.baseUrl}${url}`, this.header)
      .pipe(
        first(),
        catchError(this.errorHandler.handleError(''))
      );
  }

  getComments(url): Observable<any> {
    return this.http.get(`${this.util.baseUrl}${url}`, this.header)
      .pipe(
        first(),
        catchError(this.errorHandler.handleError(''))
      );
  }

  deleteArticle(url): Observable<any> {
    return this.http.delete(`${this.util.baseUrl}${url}`, this.header)
      .pipe(
        first(),
        map(res => res),
        catchError(this.errorHandler.handleError(''))
      );
  }

  favouriteArticle(url, data): Observable<any> {
    return this.http.post(`${this.util.baseUrl}${url}`, data, this.header)
      .pipe(
        first(),
        map(res => res),
        catchError(this.errorHandler.handleError(''))
      );
  }

  unFavouriteArticle(url): Observable<any> {
    return this.http.delete(`${this.util.baseUrl}${url}`, this.header)
      .pipe(
        first(),
        catchError(this.errorHandler.handleError(''))
      );
  }
}
