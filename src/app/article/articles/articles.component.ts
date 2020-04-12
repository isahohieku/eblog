import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/core/services/crud.service';
import { Article, ArticlesResponse } from 'src/app/core/models/article';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {

  articles: Article[] = [];
  loading: boolean;
  constructor(private crud: CrudService) { }

  ngOnInit() {
    this.getArticles();
  }

  getArticles() {
    const url = 'articles';

    this.loading = true;
    this.crud.getResource(url)
      .subscribe((res: ArticlesResponse) => { this.loading = false; this.articles = res.articles; },
        e => {this.loading = false; console.log(e); });
  }

}
