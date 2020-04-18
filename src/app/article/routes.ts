import { Route } from '@angular/router';
import { ViewComponent } from './view/view.component';
import { ArticlesComponent } from './articles/articles.component';

export const routes: Route[] = [
    { path: '', component: ArticlesComponent },
    { path: ':slug', component: ViewComponent }
];
