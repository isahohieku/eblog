import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Comment, CommentsResponse, CommentResponse } from 'src/app/core/models/comment';
import getTime from '../../../util/time';
import getMonth from '../../../util/month';
import { User } from 'src/app/core/models/user';
import { UtilService } from 'src/app/core/services/util.service';
import { CrudService } from 'src/app/core/services/crud.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  @Input() comment: Comment;
  @Output() commentDeleted = new EventEmitter<Comment>();
  formatedDate: string;
  userObj: User;
  deleteLoading: boolean;

  constructor(private util: UtilService, private crud: CrudService) { }

  ngOnInit() {
    this.getUserObject();
    const date = new Date(this.comment.createdAt);
    const time = getTime(date);
    this.formatedDate = `${date.getDate()} ${getMonth(date.getMonth())}, ${date.getFullYear()} ${time}`;
  }

  getUserObject() {
    this.userObj = this.util.getUserObject();
  }

  deleteComment() {
    const url = `articles/${this.comment.slug}/comments/${this.comment.id}`;

    this.deleteLoading = true;
    this.crud.deleteResource(url)
      .subscribe((res: CommentResponse) => {
        this.deleteLoading = false;
        this.commentDeleted.emit(res.comment);
      },
        e => { this.deleteLoading = false; console.log(e); });
  }
}
