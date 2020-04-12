import { Component, OnInit, Input } from '@angular/core';
import { Author } from 'src/app/core/models/author';

@Component({
  selector: 'app-post-meta-card',
  templateUrl: './post-meta-card.component.html',
  styleUrls: ['./post-meta-card.component.scss']
})
export class PostMetaCardComponent implements OnInit {
  @Input() author: Author;
  constructor() { }

  ngOnInit() {
  }

}
