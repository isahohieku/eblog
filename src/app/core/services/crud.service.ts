import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

import { share, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UtilService } from './util.service';
import { HttpErrorService } from './http-error.service';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

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

  getResource(url): Observable<any> {
    return this.http.get(`${this.util.baseUrl}${url}`, this.header).pipe(share(), catchError(this.errorHandler.handleError('Error')));
  }

  postResource(url, data): Observable<any> {
    return this.http.post(`${this.util.baseUrl}${url}`, data, this.header)
      .pipe(share(), catchError(this.errorHandler.handleError('Error')));
  }

  updateResource(url, data): Observable<any> {
    return this.http.put(`${this.util.baseUrl}${url}`, data, this.header)
      .pipe(share(), catchError(this.errorHandler.handleError('Error')));
  }

  deleteResource(url): Observable<any> {
    return this.http.delete(`${this.util.baseUrl}${url}`, this.header).pipe(share(), catchError(this.errorHandler.handleError('Error')));
  }
}
