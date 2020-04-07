import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MainModule } from './main/main.module';
import { SharedModule } from './shared/shared.module';
import { LayoutModule } from './layout/layout.module';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    MainModule,
    SharedModule.forRoot(),
    LayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
