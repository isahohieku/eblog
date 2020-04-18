import { Injectable, OnDestroy } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  subscription: Subscription;
  loginStatus: boolean;

  constructor(
    private auth: AuthService,
    private router: Router) {
  }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {

    if (!this.auth.getLoginStatus()) {
      localStorage.clear();
      this.router.navigateByUrl('/login');
      return false;
    }

    return true;
  }
}
