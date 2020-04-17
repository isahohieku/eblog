import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CrudService } from '../core/services/crud.service';
import { User } from '../core/models/user';
import { ArticlesResponse, Article } from '../core/models/article';
import ProfileResponse from '../core/models/profile';
import { ArticleService } from '../article/article.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  routeSubscription: Subscription;
  username: string;
  loading: boolean;
  user: User;
  articles: Article[];
  header = 'assets/img/avatar-icon.jpg';

  constructor(private route: ActivatedRoute, private router: Router, private crud: CrudService, private article: ArticleService) {
    this.routeSubscription = this.route.params.subscribe((res: Params) => {
      this.username = res.username;
      if (this.username) {
        this.getUser();
        return;
      }
      this.router.navigateByUrl('/');
    });
  }

  ngOnInit() {
    this.getArticles();
  }

  getUser() {
    const url = `profiles/${this.username}`;

    this.loading = true;
    this.crud.getResource(url)
      .subscribe((res: ProfileResponse) => {
        this.loading = false;
        this.user = res.profile;
        this.header = this.user.image;
      },
        e => { this.loading = false; console.log(e); });
  }

  getArticles() {
    const url = 'articles';

    this.loading = true;
    this.article.getArticles(url)
      .subscribe((res: ArticlesResponse) => {
        this.loading = false;
        this.articles = res.articles;
        this.articles = this.articles.filter(article => article.author.username === this.username);
      },
        e => { this.loading = false; console.log(e); });
  }
}
