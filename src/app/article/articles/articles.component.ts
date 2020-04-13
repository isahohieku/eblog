import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/core/services/crud.service';
import { Article, ArticlesResponse } from 'src/app/core/models/article';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {
  pageArticles = 1;
  pageFeed = 1;
  articles: Article[] = [];
  articlesFeed: Article[] = [];
  loading: boolean;
  feedLoading: boolean;
  constructor(private crud: CrudService) { }

  ngOnInit() {
    this.getArticles();
    this.getFeeds();
  }

  getArticles() {
    const url = 'articles';

    this.loading = true;
    this.crud.getResource(url)
      .subscribe((res: ArticlesResponse) => { this.loading = false; this.articles = res.articles; },
        e => {this.loading = false; console.log(e); });
  }

  getFeeds() {
    const url = 'articles/feed';

    this.feedLoading = true;
    this.crud.getResource(url)
      .subscribe((res: ArticlesResponse) => { this.feedLoading = false; this.articlesFeed = res.articles; },
        e => {this.feedLoading = false; console.log(e); });
  }

  pageChanged(e) {
    this.pageArticles = e;
  }

}
