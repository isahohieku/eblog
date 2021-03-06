import { Component, OnInit, Input } from '@angular/core';
import { Author } from 'src/app/core/models/author';
import getTime from '../../../util/time';
import { getMonthFull } from '../../../util/month';

@Component({
  selector: 'app-post-meta-card',
  templateUrl: './post-meta-card.component.html',
  styleUrls: ['./post-meta-card.component.scss']
})
export class PostMetaCardComponent implements OnInit {
  @Input() author: Author;
  @Input() date: number;
  formatedDate: string;
  userAvatar = 'assets/img/avatar-icon.jpg';
  constructor() { }

  ngOnInit() {
    const date = new Date(this.date);
    this.formatedDate = `${date.getDate()} ${getMonthFull(date.getMonth())}, ${date.getFullYear()}`;
    if (this.author && this.author.image) {
      this.userAvatar = this.author.image;
    }
  }

}
