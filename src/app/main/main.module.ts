import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

import { routes } from './routes';

import { HomeComponent } from '../home/home.component';
import { LoginComponent } from '../auth/login/login.component';
import { SignupComponent } from '../auth/signup/signup.component';
import { ArticleComponent } from '../article/article.component';
import { EditorComponent } from '../editor/editor.component';
import { SettingsComponent } from '../settings/settings.component';
import { ProfileComponent } from '../profile/profile.component';


@NgModule({
  declarations: [
    HomeComponent,
    LoginComponent,
    SignupComponent,
    ArticleComponent,
    EditorComponent,
    SettingsComponent,
    ProfileComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class MainModule { }
