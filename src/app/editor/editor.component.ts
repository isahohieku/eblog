import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CrudService } from '../core/services/crud.service';
import { Article, ArticleResponse } from '../core/models/article';
import { UtilService } from '../core/services/util.service';
import { User } from '../core/models/user';
import { Author } from '../core/models/author';
import { Tag } from '../core/models/tags';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { EditorService } from './editor.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit, OnDestroy {

  loading = false;
  userObj: User;
  tag = '';
  title = '';
  description = '';
  body = '';
  tagList: Tag[] = [];
  slug: string;
  article: Article;
  routeSubscription: Subscription;
  @ViewChild('f', { static: false }) form: NgForm;

  constructor(private crud: EditorService, private util: UtilService, private router: Router, private route: ActivatedRoute) {
    this.routeSubscription = this.route.params.subscribe((res: Params) => {
      this.slug = res.slug;
      if (this.slug) {
        this.getArticle();
      }
    });
  }

  ngOnInit() {
    this.getUserObject();
  }

  getUserObject() {
    this.userObj = this.util.getUserObject();
  }

  addTag(e: Event) {
    e.stopPropagation();
    e.preventDefault();
    if (this.tag) {
      this.tagList.push(this.tag);
    }
    this.tag = '';
  }

  remove(index) {
    this.tagList.splice(index, 1);
  }

  getArticle() {
    const url = `articles/${this.slug}`;

    this.loading = true;
    this.crud.getArticle(url)
      .subscribe((res: ArticleResponse) => {
        this.loading = false;
        this.article = res.article;

        if (this.userObj.username === this.article.author.username) {
          this.tagList = res.article.tagList;
          this.body = this.article.body;
          this.title = this.article.title;
          this.description = this.article.description;
        } else {
          // Throw toast
        }
      },
        e => { this.loading = false; console.log(e); });
  }

  addArticle() {
    const title = this.title;
    const description = this.description;
    const body = this.body;
    const tagList: Tag[] = this.tagList;
    const author: Author = {
      username: this.userObj.username,
      image: this.userObj.image,
      following: this.userObj.following,
      bio: this.userObj.bio,
    };

    const article: Article = {
      tagList,
      author,
      title,
      description,
      body,
      favoritesCount: 0,
      favorited: false,
      slug: '',
      createdAt: '',
      updatedAt: ''
    };

    const data = {
      article
    };

    let url = 'articles';

    this.loading = true;
    if (this.slug) {
      url = `${url}/${this.article.slug}`;
      this.crud.updateArticle(url, data).subscribe((res: ArticleResponse) => {
        this.loading = false;
        const articleUrl = `articles/${res.article.slug}`;
        this.router.navigateByUrl(articleUrl);
      },
        e => { this.loading = false; console.log(e); });
    } else {

      this.crud.addArticle(url, data).subscribe((res: ArticleResponse) => {
        this.loading = false;
        const articleUrl = `articles`;
        this.router.navigateByUrl(articleUrl);
      },
        e => { this.loading = false; console.log(e); });
    }
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
  }
}
