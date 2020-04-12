import { Component, OnInit, Input } from '@angular/core';
import { CrudService } from 'src/app/core/services/crud.service';
import { Article } from 'src/app/core/models/article';
import parseMd from '../../../util/parser';

@Component({
  selector: 'app-parsed-md',
  templateUrl: './parsed-md.component.html',
  styleUrls: ['./parsed-md.component.scss']
})
export class ParsedMdComponent implements OnInit {

  @Input() article: Article;
  body: string;

  constructor(private crud: CrudService) {

  }

  ngOnInit() {
    this.body = parseMd(this.article.body);
  }

}
