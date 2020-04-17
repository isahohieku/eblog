import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CrudService } from 'src/app/core/services/crud.service';
import { UtilService } from 'src/app/core/services/util.service';
import { User } from 'src/app/core/models/user';
import { Author } from 'src/app/core/models/author';
import { Comment, CommentResponse } from 'src/app/core/models/comment';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss']
})
export class CommentFormComponent implements OnInit {
  @Input() slug: string;
  @ViewChild('f', { static: false }) form: NgForm;
  @Output() commentAdded = new EventEmitter<Comment>();
  loading: boolean;
  userObj: Author;
  body = '';

  constructor(private crud: CrudService, private util: UtilService) { }

  ngOnInit() {
    this.getUserObject();
  }

  getUserObject() {
    this.userObj = this.util.getUserObject();
  }

  addComment() {
    if (!this.body) {
      return;
    }

    const url = `articles/${this.slug}/comments`;

    const comment: Comment = {
      createdAt: '',
      author: this.userObj,
      id: 0,
      body: this.body,
      updatedAt: ''
    };

    const data = {
      comment
    };

    this.loading = true;
    this.crud.postResource(url, data)
      .subscribe((res: CommentResponse) => {
        this.commentAdded.emit(res.comment);
        this.form.reset();
        this.loading = false;
      }, e => { this.loading = false; console.log(e); });
  }
}
