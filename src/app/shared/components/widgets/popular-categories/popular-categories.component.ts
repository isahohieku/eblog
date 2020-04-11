import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../../../core/services/crud.service';
import { Tags, Tag } from '../../../../core/models/tags';

@Component({
  selector: 'app-popular-categories',
  templateUrl: './popular-categories.component.html',
  styleUrls: ['./popular-categories.component.scss']
})
export class PopularCategoriesComponent implements OnInit {
  loading = false;
  tags: Tag[];

  constructor(private crud: CrudService) { }

  ngOnInit() {
    this.getTags();
  }

  getTags() {

    const url = 'tags';

    this.loading = true;
    this.crud.getResource(url)
      .subscribe((res: Tags) => {
        this.tags = res.tags;
        this.loading = false;
      }, e => {console.log(e); this.loading = false; });
  }

}
