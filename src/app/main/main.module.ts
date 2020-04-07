import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

import { routes } from './routes';

import { HomeComponent } from '../home/home.component';


@NgModule({
  declarations: [
    HomeComponent
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
