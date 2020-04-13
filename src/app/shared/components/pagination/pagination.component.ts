import { Component, OnInit, Input } from '@angular/core';
import { Article } from 'src/app/core/models/article';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  p = 1;
  @Input() items: Article[];
  constructor() { }

  ngOnInit() {
  }

  pageChanged(page) {
    this.p = page;
  }

}
