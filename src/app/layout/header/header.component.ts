import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Router, NavigationEnd } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  routes = [
    {
      title: 'Home',
      route: '/'
    },
    {
      title: 'Articles',
      route: '/articles'
    },
    {
      title: 'Blog',
      route: '/'
    },
    {
      title: 'Contact',
      route: '/'
    }
  ];

  isLogin = false;
  loginStatusSubscription: Subscription;
  routerSubscription: Subscription;
  resizeJumbo: boolean;

  constructor(private auth: AuthService, private router: Router) {
    this.loginStatusSubscription = this.auth.listenToLoginStatus().subscribe((res: boolean) => this.isLogin = res);
    this.routerSubscription = this.router.events.subscribe(res => {
      if ((res instanceof NavigationEnd)) {
        if (res.url !== '/') {
          this.resizeJumbo = true;
        } else {
          this.resizeJumbo = false;
        }
      }
    });
  }

  ngOnInit() { }

  ngOnDestroy() {
    this.loginStatusSubscription.unsubscribe();
  }

}
