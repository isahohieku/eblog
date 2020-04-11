import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

import { share } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UtilService } from './util.service';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  private header: { headers: HttpHeaders; };

  constructor(
    private http: HttpClient,
    private util: UtilService
  ) {
    this.header = {
      headers: new HttpHeaders()
    };
  }

  getResource(url): Observable<any> {
    return this.http.get(`${this.util.baseUrl}${url}`, this.header).pipe(share());
  }

  getFile(url): Observable<any> {
    return this.http.get(url, {responseType: 'text'}).pipe(share());
  }

  postResource(url, data): Observable<any> {
    return this.http.post(`${this.util.baseUrl}${url}`, data, this.header).pipe(share());
  }

  updateResource(url, data): Observable<any> {
    return this.http.put(`${this.util.baseUrl}${url}`, data, this.header).pipe(share());
  }

  deleteResource(url): Observable<any> {
    return this.http.delete(`${this.util.baseUrl}${url}`, this.header).pipe(share());
  }
}
