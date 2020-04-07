import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { PostMetaCardComponent } from './components/cards/post-meta-card/post-meta-card.component';
import { PostCardComponent } from './components/cards/post-card/post-card.component';
import { AuthorComponent } from './components/widgets/author/author.component';
import { PopularPostsComponent } from './components/widgets/popular-posts/popular-posts.component';
import { PopularPostsCardComponent } from './components/cards/popular-posts-card/popular-posts-card.component';
// import { AuthInterceptor } from '../auth-interceptor/http-interceptor';


@NgModule({
  declarations: [
    PostMetaCardComponent,
    PostCardComponent,
    AuthorComponent,
    PopularPostsComponent,
    PopularPostsCardComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule
  ],
  providers: [
    // { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  exports: [
    // Modules
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,

    // Components
    PostMetaCardComponent,
    PostCardComponent,
    AuthorComponent,
    PopularPostsComponent,
    PopularPostsCardComponent

  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule
    };
  }
}
