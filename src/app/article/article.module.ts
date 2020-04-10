import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditorComponent } from './editor/editor.component';
import { ViewComponent } from './view/view.component';



@NgModule({
  declarations: [EditorComponent, ViewComponent],
  imports: [
    CommonModule
  ]
})
export class ArticleModule { }
