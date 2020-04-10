import { Routes } from '@angular/router';
import { ViewComponent } from './view/view.component';
import { ArticlesComponent } from './articles/articles.component';

export const routes: Routes = [
    { path: '', component: ArticlesComponent },
    { path: ':slug', component: ViewComponent }
];
