import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/core/services/crud.service';
import { Article, ArticlesResponse } from 'src/app/core/models/article';
import { UtilService } from 'src/app/core/services/util.service';
import { User } from 'src/app/core/models/user';
import { ArticleService } from '../article.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {
  page = 1;
  articles: Article[] = [];
  articlesFeed: Article[] = [];
  loading: boolean;
  feedLoading: boolean;
  userObj: User;

  constructor(private crud: ArticleService, private util: UtilService) { }

  ngOnInit() {
    this.getUserObject();
    this.getArticles();
    this.getFeeds();
  }

  getArticles() {
    const url = 'articles';

    this.loading = true;
    this.crud.getArticles(url)
      .subscribe((res: ArticlesResponse) => { this.loading = false; this.articles = res.articles; },
        e => { this.loading = false; console.log(e); });
  }

  getUserObject() {
    this.userObj = this.util.getUserObject();
  }

  getFeeds() {
    if (this.userObj !== null) {
      const url = 'articles/feed';

      this.feedLoading = true;
      this.crud.getArticlesFeed(url)
        .subscribe((res: ArticlesResponse) => { this.feedLoading = false; this.articlesFeed = res.articles; },
          e => { this.feedLoading = false; console.log(e); });
    }
  }

  pageChanged(e) {
    this.page = e;
  }

}
