import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { CrudService } from '../core/services/crud.service';
import { ArticlesResponse, Article } from '../core/models/article';
import { UtilService } from '../core/services/util.service';
import { User } from '../core/models/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  isLogin = false;
  loading: boolean;
  feedLoading: boolean;
  articles: Article[] = [];
  articlesFeed: Article[] = [];
  loginStatusSubscription: Subscription;
  userObj: User;
  page = 1;

  constructor(private auth: AuthService, private crud: CrudService, private util: UtilService) {
    this.loginStatusSubscription = this.auth.listenToLoginStatus().subscribe((res: boolean) => this.isLogin = res);
  }

  ngOnInit() {
    this.getObject();
    this.getArticles();
    if (this.userObj.username) {
      setTimeout(() => {
        this.getFeeds();
      }, 100);
    }
  }

  getObject() {
    this.userObj = this.util.getUserObject();
  }

  getArticles() {
    const url = 'articles';

    this.loading = true;
    this.crud.getResource(url)
      .subscribe((res: ArticlesResponse) => { this.loading = false; this.articles = res.articles; },
        e => {this.loading = false; console.log(e); });
  }

  pageChanged(e) {
    this.page = e;
  }

  getFeeds() {
    const url = 'articles/feed';

    this.feedLoading = true;
    this.crud.getResource(url)
      .subscribe((res: ArticlesResponse) => { this.feedLoading = false; this.articlesFeed = res.articles; },
        e => {this.feedLoading = false; console.log(e); });
  }

  ngOnDestroy() {
    this.loginStatusSubscription.unsubscribe();
  }

}
