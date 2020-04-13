import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Router, NavigationEnd } from '@angular/router';
import { UtilService } from 'src/app/core/services/util.service';
import { User } from 'src/app/core/models/user';


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

  noJumboUrls = ['/settings', '/profile'];

  noJumbo = false;

  isLogin = false;
  loginStatusSubscription: Subscription;
  routerSubscription: Subscription;
  resizeJumbo: boolean;
  userObj: User;

  constructor(private auth: AuthService, private router: Router, private util: UtilService) {
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

        if (this.noJumboUrls.includes(res.url) || this.findIfContainsProfile()) {
          this.noJumbo = true;
          this.resizeJumbo = false;
          return;
        }

        this.resizeJumbo = false;

      }
    });
  }

  ngOnInit() {
    this.getUserObject();
  }

  findIfContainsProfile() {
    const result = this.noJumboUrls.some(item => item.includes('profile'));
    console.log(result);
  }

  logout() {
    this.auth.logout();
  }

  getUserObject() {
    this.userObj = this.util.getUserObject();
  }

  ngOnDestroy() {
    this.loginStatusSubscription.unsubscribe();
  }

}
