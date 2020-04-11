import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CrudService } from '../core/services/crud.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {

  loading = false;

  constructor(private crud: CrudService) { }

  ngOnInit() {
  }

  addArticle(form: NgForm) {
    // console.log(form.value);
    // console.log(form.errors);
    // console.log(form.invalid);
    // if (form.invalid) {
    //   return;
    // }

    const { title, description, body } = form.value;
    const tagList = [];

    const data = {
      title,
      description,
      article: body,
      tagList
    };

    const url = 'articles';

    this.loading = true;
    this.crud.postResource(url, data).subscribe(res => {
      this.loading = false;
      console.log(res);
    },
    e => {this.loading = false; console.log(e); });
  }
}
