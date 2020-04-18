import { Component, OnInit, Input } from '@angular/core';
import { Article } from 'src/app/core/models/article';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss']
})
export class PostCardComponent implements OnInit {
  @Input() article: Article;
  constructor() { }

  ngOnInit() {
  }


}
