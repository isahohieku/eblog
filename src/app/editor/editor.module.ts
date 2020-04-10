import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { EditorComponent } from './editor.component';
import { routes } from './routes';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [EditorComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class EditorModule { }
