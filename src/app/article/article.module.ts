import { NgModule } from '@angular/core';
import { ViewComponent } from './view/view.component';
import { ArticleComponent } from './article.component';
import { SharedModule } from '../shared/shared.module';

import { routes } from './routes';
import { RouterModule } from '@angular/router';
import { ArticlesComponent } from './articles/articles.component';

@NgModule({
  declarations: [ViewComponent, ArticlesComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ArticleModule { }
