import { Component, OnInit } from '@angular/core';
import { ArticlesResponse, Article } from '../core/models/article';
import { UtilService } from '../core/services/util.service';
import { User } from '../core/models/user';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  isLogin = false;
  loading: boolean;
  feedLoading: boolean;
  articles: Article[] = [];
  articlesFeed: Article[] = [];
  userObj: User;
  page = 1;
  pageGlobal = 1;

  constructor(private crud: HomeService, private util: UtilService) {
  }

  ngOnInit() {
    this.getObject();
    this.getArticles();

    if (!this.userObj) {
      return;
    }

    setTimeout(() => {
      this.getFeeds();
    });

  }

  getObject() {
    this.userObj = this.util.getUserObject();
  }

  getArticles() {
    const url = 'articles';

    this.loading = true;
    this.crud.getArticles(url)
      .subscribe((res: ArticlesResponse) => { this.loading = false; this.articles = res.articles; },
        e => { this.loading = false; console.log(e); });
  }

  pageChanged(e) {
    this.page = e;
  }

  pageGlobalChanged(e) {
    this.pageGlobal = e;
  }

  getFeeds() {
    const url = 'articles/feed';

    this.feedLoading = true;
    this.crud.getArticlesFeed(url)
      .subscribe((res: ArticlesResponse) => { this.feedLoading = false; this.articlesFeed = res.articles; },
        e => { this.feedLoading = false; console.log(e); });
  }

}
