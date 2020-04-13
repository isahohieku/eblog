import { Routes } from '@angular/router';
import { LayoutComponent } from '../layout/layout.component';
import { HomeComponent } from '../home/home.component';
import { LoginComponent } from '../auth/login/login.component';
import { SignupComponent } from '../auth/signup/signup.component';
import { ArticleComponent } from '../article/article.component';
import { EditorComponent } from '../editor/editor.component';
import { SettingsComponent } from '../settings/settings.component';
import { ProfileComponent } from '../profile/profile.component';

export const routes: Routes = [
    {
        path: '', component: LayoutComponent,
        children: [
            { path: '', component: HomeComponent },
            { path: 'articles', component: ArticleComponent, loadChildren: '../article/article.module#ArticleModule' },
            { path: 'editor', component: EditorComponent },
            { path: 'editor/:slug', component: EditorComponent },
            { path: 'settings', component: SettingsComponent },
            { path: 'profile/:username', component: ProfileComponent }
        ]
    },
    { path: 'login', component: LoginComponent},
    { path: 'signup', component: SignupComponent},
];
