import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  isLogin = false;
  loginStatusSubscription: Subscription;

  constructor(private auth: AuthService) {
    this.loginStatusSubscription = this.auth.listenToLoginStatus().subscribe((res: boolean) => this.isLogin = res);
  }

  ngOnInit() {

  }

  ngOnDestroy() {
    this.loginStatusSubscription.unsubscribe();
  }

}
