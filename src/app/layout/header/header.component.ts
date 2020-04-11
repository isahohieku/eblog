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

  noJumboUrls = ['/settings'];

  noJumbo = false;

  isLogin = false;
  loginStatusSubscription: Subscription;
  routerSubscription: Subscription;
  resizeJumbo: boolean;

  constructor(private auth: AuthService, private router: Router) {
    this.loginStatusSubscription = this.auth.listenToLoginStatus().subscribe((res: boolean) => this.isLogin = res);
    this.routerSubscription = this.router.events.subscribe(res => {
      if ((res instanceof NavigationEnd)) {
        if (!this.noJumboUrls.includes(res.url) && !(res.url === '/')) {
          this.resizeJumbo = true;
          this.noJumbo = false;
          return;
        }

        if (res.url === '/') {
          this.resizeJumbo = false;
          this.noJumbo = false;
          return;
        }

        if (this.noJumboUrls.includes(res.url)) {
          this.noJumbo = true;
          this.resizeJumbo = false;
          return;
        }

        this.resizeJumbo = false;

      }
    });
  }

  ngOnInit() { }

  logout() {
    this.auth.logout();
  }

  ngOnDestroy() {
    this.loginStatusSubscription.unsubscribe();
  }

}
