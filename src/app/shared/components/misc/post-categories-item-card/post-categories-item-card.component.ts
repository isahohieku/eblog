import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-post-categories-item-card',
  templateUrl: './post-categories-item-card.component.html',
  styleUrls: ['./post-categories-item-card.component.scss']
})
export class PostCategoriesItemCardComponent implements OnInit {
  @Input() title = '';

  constructor() { }

  ngOnInit() {
  }

}
