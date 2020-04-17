import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CrudService } from 'src/app/core/services/crud.service';
import { ArticleResponse, Article } from 'src/app/core/models/article';
import { Tag } from 'src/app/core/models/tags';
import { UtilService } from 'src/app/core/services/util.service';
import { User } from 'src/app/core/models/user';
import { Comment, CommentsResponse } from 'src/app/core/models/comment';
import { ArticleService } from '../article.service';

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
  getCommentsLoading: boolean;
  comments: Comment[] = [];

  constructor(private route: ActivatedRoute, private crud: ArticleService, private util: UtilService, private router: Router) {
    this.route.params.subscribe((res: Params) => this.slug = res.slug);
  }

  ngOnInit() {
    this.getUserObject();
    this.getArticle();
    this.getComments();
  }

  getUserObject() {
    this.userObj = this.util.getUserObject();
  }

  getArticle() {
    const url = `articles/${this.slug}`;

    this.loading = true;
    this.crud.getArticle(url)
      .subscribe((res: ArticleResponse) => {
        this.loading = false;
        this.article = res.article;
        this.tags = res.article.tagList;
      },
        e => { this.loading = false; console.log(e); }).unsubscribe();
  }

  getComments() {
    const url = `articles/${this.slug}/comments`;

    this.getCommentsLoading = true;
    this.crud.getComments(url)
      .subscribe((res: CommentsResponse) => {
        this.getCommentsLoading = false;
        this.comments = res.comments;
      },
        e => { this.getCommentsLoading = false; console.log(e); }).unsubscribe();
  }

  favouriteArticle() {
    const url = `articles/${this.slug}/favorite`;

    !this.article.favorited ?
      this.article.favorited = true : this.article.favorited = !this.article.favorited;

    const data = { article: this.article };


    this.article.favorited ?
      this.crud.favouriteArticle(url, data)
        .subscribe((res: CommentsResponse) => {
          console.log(res);
        },
          e => { console.log(e); }).unsubscribe() :
      this.crud.unFavouriteArticle(url)
        .subscribe((res: CommentsResponse) => {
          console.log(res);
        },
          e => { console.log(e); }).unsubscribe();
  }

  commentAdded(comment: Comment) {
    this.comments.push(comment);
  }

  deleteComment(index: number) {
    this.comments.splice(index, 1);
  }

  deleteArticle() {
    const url = `articles/${this.slug}`;

    this.deleteLoading = true;
    this.crud.deleteArticle(url)
      .subscribe((res: ArticleResponse) => {
        this.deleteLoading = false;
        this.router.navigateByUrl('/articles');
      },
        e => { this.deleteLoading = false; console.log(e); }).unsubscribe();
  }

}
