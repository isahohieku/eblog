import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UtilService } from '../core/services/util.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private login: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private util: UtilService,
    private router: Router
  ) {

    if (!this.util.getUserObject()) {
      this.setLoginStatus(false);
    } else {
      this.setLoginStatus(true);
    }
   }

  setLoginStatus(value) {
    this.login.next(value);
  }

  listenToLoginStatus(): Observable<boolean> {
    return this.login.asObservable();
  }

  logout() {
    localStorage.clear();
    this.setLoginStatus(false);
    this.router.navigateByUrl('/');
  }
}
