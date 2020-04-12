import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CrudService } from 'src/app/core/services/crud.service';
import { ArticleResponse, Article } from 'src/app/core/models/article';
import { Tag } from 'src/app/core/models/tags';
import { UtilService } from 'src/app/core/services/util.service';
import { User } from 'src/app/core/models/user';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

  slug: string;
  loading: boolean;
  article: Article;
  tags: Tag[];
  userObj: User;
  deleteLoading: boolean;

  constructor(private route: ActivatedRoute, private crud: CrudService, private util: UtilService, private router: Router) {
    this.route.params.subscribe((res: Params) => this.slug = res.slug);
  }

  ngOnInit() {
    this.getUserObject();
    this.getArticle();
  }

  getUserObject() {
    this.userObj = this.util.getUserObject();
  }

  getArticle() {
    const url = `articles/${this.slug}`;

    this.loading = true;
    this.crud.getResource(url)
      .subscribe((res: ArticleResponse) => {
        this.loading = false;
        this.article = res.article;
        this.tags = res.article.tagList;
      },
        e => { this.loading = false; console.log(e); });
  }

  deleteArticle() {
    const url = `articles/${this.slug}`;

    this.deleteLoading = true;
    this.crud.deleteResource(url)
      .subscribe((res: ArticleResponse) => {
        this.deleteLoading = false;
        this.router.navigateByUrl('/articles');
      },
        e => { this.deleteLoading = false; console.log(e); });
  }

}
