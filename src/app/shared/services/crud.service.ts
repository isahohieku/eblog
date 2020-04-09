import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

import { share } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  private header: { headers: HttpHeaders; };

  constructor(
    private http: HttpClient,
  ) {
    this.header = {
      headers: new HttpHeaders()
    };
  }

  getResource(url): Observable<any> {
    return this.http.get(`${url}`, this.header).pipe(share());
  }

  postResource(url, data): Observable<any> {
    return this.http.post(`${url}`, data, this.header).pipe(share());
  }

  updateResource(url, data): Observable<any> {
    return this.http.put(`${url}`, data, this.header).pipe(share());
  }

  deleteResource(url): Observable<any> {
    return this.http.delete(`${url}`, this.header).pipe(share());
  }
}
