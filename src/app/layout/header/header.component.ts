import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  routes = [
    {
      title: 'Home'
    },
    {
      title: 'Pages'
    },
    {
      title: 'Blog'
    },
    {
      title: 'Contact'
    }
  ];

  isLogin = false;
  loginStatusSubscription: Subscription;

  constructor(private auth: AuthService) {
    this.loginStatusSubscription = this.auth.listenToLoginStatus().subscribe((res: boolean) => this.isLogin = res);
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.loginStatusSubscription.unsubscribe();
  }

}
