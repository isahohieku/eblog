import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { CrudService } from '../core/services/crud.service';
import { ArticlesResponse, Article } from '../core/models/article';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  isLogin = false;
  loading: boolean;
  articles: Article[];
  loginStatusSubscription: Subscription;

  constructor(private auth: AuthService, private crud: CrudService) {
    this.loginStatusSubscription = this.auth.listenToLoginStatus().subscribe((res: boolean) => this.isLogin = res);
  }

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

  ngOnDestroy() {
    this.loginStatusSubscription.unsubscribe();
  }

}
