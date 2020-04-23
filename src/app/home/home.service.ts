import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { UtilService } from '../core/services/util.service';
import { Observable } from 'rxjs';
import { first, catchError } from 'rxjs/operators';
import { HttpErrorService } from '../core/services/http-error.service';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private header: { headers: HttpHeaders; };

  constructor(
    private http: HttpClient,
    private util: UtilService,
    private errorHandler: HttpErrorService
  ) {
    this.header = {
      headers: new HttpHeaders()
    };
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

}
