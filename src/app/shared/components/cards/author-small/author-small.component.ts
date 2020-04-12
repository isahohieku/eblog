import { Component, OnInit, Input } from '@angular/core';
import { Author } from 'src/app/core/models/author';
import getMonth from '../../../util/month';
import getTime from '../../../util/time';

@Component({
  selector: 'app-author-small',
  templateUrl: './author-small.component.html',
  styleUrls: ['./author-small.component.scss']
})
export class AuthorSmallComponent implements OnInit {

  @Input() date: number;
  @Input() author: Author;
  formatedDate: string;

  constructor() { }

  ngOnInit() {
    setTimeout(() => {
      const date = new Date(this.date);
      const time = getTime(date);
      this.formatedDate = `${date.getDate()} ${getMonth(date.getMonth())}, ${date.getFullYear()} ${time}`;
    }, 1000);
  }

}
