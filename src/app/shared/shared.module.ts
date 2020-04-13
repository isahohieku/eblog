import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AuthInterceptor } from '../auth/auth-interceptor/http-interceptor';

import { NgxPaginationModule } from 'ngx-pagination';

import { StickyTopDirective } from './directives/sticky-top.directive';

import { PostMetaCardComponent } from './components/cards/post-meta-card/post-meta-card.component';
import { PostCardComponent } from './components/cards/post-card/post-card.component';
import { AuthorComponent } from './components/widgets/author/author.component';
import { PopularPostsComponent } from './components/widgets/popular-posts/popular-posts.component';
import { PopularPostsCardComponent } from './components/cards/popular-posts-card/popular-posts-card.component';
import { PopularCategoriesComponent } from './components/widgets/popular-categories/popular-categories.component';
import { PostCategoriesItemCardComponent } from './components/misc/post-categories-item-card/post-categories-item-card.component';
import { FormControlComponent } from './components/forms/form-control/form-control.component';
import { SearchWidgetComponent } from './components/widgets/search-widget/search-widget.component';
import { LoaderComponent } from './components/misc/loader/loader.component';
import { TextareaComponent } from './components/forms/textarea/textarea.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { TagListComponent } from './components/cards/tag-list/tag-list.component';
import { AuthorSmallComponent } from './components/cards/author-small/author-small.component';
import { ParsedMdComponent } from './components/cards/parsed-md/parsed-md.component';
import { TagItemComponent } from './components/misc/tag-item/tag-item.component';
import { CommentFormComponent } from './components/forms/comment-form/comment-form.component';
import { CommentComponent } from './components/cards/comment/comment.component';
import { ProfileCardComponent } from './components/cards/profile-card/profile-card.component';

@NgModule({
  declarations: [
    PostMetaCardComponent,
    PostCardComponent,
    AuthorComponent,
    PopularPostsComponent,
    PopularPostsCardComponent,
    PopularCategoriesComponent,
    PostCategoriesItemCardComponent,
    TextareaComponent,
    FormControlComponent,
    SearchWidgetComponent,
    LoaderComponent,
    PaginationComponent,
    TagListComponent,
    AuthorSmallComponent,
    ParsedMdComponent,
    TagItemComponent,
    CommentFormComponent,
    CommentComponent,
    ProfileCardComponent,

    // Directives
    StickyTopDirective,



  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    NgxPaginationModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
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
    PopularPostsCardComponent,
    PopularCategoriesComponent,
    PostCategoriesItemCardComponent,
    TextareaComponent,
    FormControlComponent,
    SearchWidgetComponent,
    LoaderComponent,
    PaginationComponent,
    TagListComponent,
    AuthorSmallComponent,
    ParsedMdComponent,
    TagItemComponent,
    CommentFormComponent,
    CommentComponent,
    ProfileCardComponent,

    // Directives
    StickyTopDirective,

    // Modules
    NgxPaginationModule


  ]
})
export class SharedModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule
    };
  }
}
