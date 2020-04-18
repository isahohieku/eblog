import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UtilService } from '../core/services/util.service';
import { Router } from '@angular/router';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { HttpErrorService } from '../core/services/http-error.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private header: { headers: HttpHeaders; };
  private login: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private util: UtilService,
    private http: HttpClient,
    private router: Router,
    private errorHandler: HttpErrorService
  ) {

    if (!this.util.getUserObject()) {
      this.setLoginStatus(false);
    } else {
      this.setLoginStatus(true);
    }

    this.header = {
      headers: new HttpHeaders()
    };
   }

  setLoginStatus(value: boolean) {
    this.login.next(value);
  }

  listenToLoginStatus(): Observable<boolean> {
    return this.login.asObservable();
  }

  getLoginStatus(): boolean {
    return this.login.value;
  }

  loginUser(url: string, data): Observable<any> {
    return this.http.post(`${this.util.baseUrl}${url}`, data, this.header)
      .pipe(catchError(this.errorHandler.handleError('')));
  }

  logout() {
    localStorage.clear();
    this.setLoginStatus(false);
    this.router.navigateByUrl('/login');
  }
}
