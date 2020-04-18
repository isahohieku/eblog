import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Router, NavigationEnd } from '@angular/router';
import { UtilService } from 'src/app/core/services/util.service';
import { User } from 'src/app/core/models/user';
declare var $: any;

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
  userObj: User;
  userAvatar = 'assets/img/avatar-icon.jpg';

  constructor(private auth: AuthService, private router: Router, private util: UtilService) {
    this.loginStatusSubscription = this.auth.listenToLoginStatus().subscribe((res: boolean) => this.isLogin = res);
    this.routerSubscription = this.router.events.subscribe(res => {
      if ((res instanceof NavigationEnd)) {
        const body = $('html, body');
        body.stop().animate({ scrollTop: 0 }, 500, 'swing');

        if (!this.noJumboUrls.includes(res.url) && !this.findIfContainsProfile(res.url) && !(res.url === '/')) {
          this.resizeJumbo = true;
          this.noJumbo = false;
          return;
        }

        if (res.url === '/') {
          this.resizeJumbo = false;
          this.noJumbo = false;
          return;
        }

        if (this.noJumboUrls.includes(res.url) || this.findIfContainsProfile(res.url)) {
          this.noJumbo = true;
          this.resizeJumbo = false;
          return;
        }

      }
    });
  }

  ngOnInit() {
    this.getUserObject();
  }

  findIfContainsProfile(url: string) {
    return url.includes('profile');
  }

  logout() {
    this.auth.logout();
  }

  getUserObject() {
    this.userObj = this.util.getUserObject();
    if (this.userObj && (this.userObj.image !== '')) {
      this.userAvatar = this.userObj.image;
    }
  }

  ngOnDestroy() {
    this.loginStatusSubscription.unsubscribe();
  }

}
