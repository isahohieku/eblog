import { Routes } from '@angular/router';
import { LayoutComponent } from '../layout/layout.component';
import { HomeComponent } from '../home/home.component';
import { LoginComponent } from '../auth/login/login.component';
import { SignupComponent } from '../auth/signup/signup.component';
import { ArticleComponent } from '../article/article.component';
import { EditorComponent } from '../editor/editor.component';

export const routes: Routes = [
    {
        path: '', component: LayoutComponent,
        children: [
            { path: '', component: HomeComponent },
            { path: 'articles' , component: ArticleComponent },
            { path: 'editor' , component: EditorComponent }
        ]
    },
    { path: 'login', component: LoginComponent},
    { path: 'signup', component: SignupComponent},
];
