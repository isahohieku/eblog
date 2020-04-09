import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

import { routes } from './routes';

import { HomeComponent } from '../home/home.component';
import { LoginComponent } from '../auth/login/login.component';
import { SignupComponent } from '../auth/signup/signup.component';


@NgModule({
  declarations: [
    HomeComponent,
    LoginComponent,
    SignupComponent
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
