import { Routes } from '@angular/router';
import { EditorComponent } from './editor/editor.component';
import { ViewComponent } from './view/view.component';
import { ArticlesComponent } from './articles/articles.component';

export const routes: Routes = [
    { path: '', component: ArticlesComponent },
    { path: 'editor', component: EditorComponent },
    { path: 'editor/:slug', component: EditorComponent },
    { path: ':slug', component: ViewComponent }
];
