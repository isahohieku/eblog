import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { UtilService } from '../core/services/util.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EditorService {

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

  addArticle(url, data): Observable<any> {
    return this.http.post(`${this.util.baseUrl}${url}`, data, this.header)
      .pipe(
        map(res => res)
      );
  }

  updateArticle(url, data): Observable<any> {
    return this.http.put(`${this.util.baseUrl}${url}`, data, this.header)
      .pipe(
        map(res => res)
      );
  }
}
