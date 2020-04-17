import { Injectable, OnDestroy } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, OnDestroy {
  subscription: Subscription;
  loginStatus: boolean;

  constructor(
    private auth: AuthService,
    private router: Router) {
    this.listenToUserObjChange();
  }

  listenToUserObjChange() {
    this.auth.listenToLoginStatus().subscribe(res => this.loginStatus = res);
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if (!this.loginStatus) {
      localStorage.clear();
      return this.router.navigateByUrl('/login');
    }

    return true;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
