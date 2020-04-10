import { Route } from '@angular/router';
import { EditorComponent } from './editor.component';

export const routes: Route[] = [
    { path: 'editor', component: EditorComponent },
    { path: 'editor/:slug', component: EditorComponent }
];
