import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { UtilService } from '../core/services/util.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private header: { headers: HttpHeaders; };

  constructor(
    private http: HttpClient,
    private util: UtilService
  ) {
    this.header = {
      headers: new HttpHeaders()
    };
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

}
