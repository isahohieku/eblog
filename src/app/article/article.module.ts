import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ViewComponent } from './view/view.component';
import { SharedModule } from '../shared/shared.module';
import { ArticlesComponent } from './articles/articles.component';

import { routes } from './routes';

@NgModule({
  declarations: [ViewComponent, ArticlesComponent],
  imports: [
    RouterModule.forChild(routes),
    SharedModule,
  ],
  exports: [RouterModule]
})
export class ArticleModule { }
