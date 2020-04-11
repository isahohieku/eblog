import { NgModule } from '@angular/core';
import { SettingsComponent } from './settings.component';
import { routes } from './routes';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [SettingsComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class SettingsModule { }
