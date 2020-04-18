import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AuthInterceptor } from '../auth/auth-interceptor/http-interceptor';
import { environment } from '../../environments/environment.prod';

import { NgxPaginationModule } from 'ngx-pagination';
import { ToastrModule } from 'ngx-toastr';
import { CloudinaryModule, CloudinaryConfiguration } from '@cloudinary/angular-5.x';
import { FileUploadModule } from 'ng2-file-upload';
import { Cloudinary as cloudinary_core } from 'cloudinary-core';

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
import { TagListComponent } from './components/cards/tag-list/tag-list.component';
import { AuthorSmallComponent } from './components/cards/author-small/author-small.component';
import { ParsedMdComponent } from './components/cards/parsed-md/parsed-md.component';
import { TagItemComponent } from './components/misc/tag-item/tag-item.component';
import { CommentFormComponent } from './components/forms/comment-form/comment-form.component';
import { CommentComponent } from './components/cards/comment/comment.component';
import { ProfileCardComponent } from './components/cards/profile-card/profile-card.component';
import { ImageUploadSingleComponent } from './image-upload-single/image-upload-single.component';
import { ErrorComponent } from './components/error/error.component';

const cloudinary = {
  Cloudinary: cloudinary_core
};

const config: CloudinaryConfiguration = environment.cloudinaryConfigs;

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
    TagListComponent,
    AuthorSmallComponent,
    ParsedMdComponent,
    TagItemComponent,
    CommentFormComponent,
    CommentComponent,
    ProfileCardComponent,
    ImageUploadSingleComponent,
    ErrorComponent,

    // Directives
    StickyTopDirective,

  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    NgxPaginationModule,
    ToastrModule.forRoot(),
    // Cloudinary and File upload
    CloudinaryModule.forRoot(cloudinary, config),
    FileUploadModule,
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
    TagListComponent,
    AuthorSmallComponent,
    ParsedMdComponent,
    TagItemComponent,
    CommentFormComponent,
    CommentComponent,
    ProfileCardComponent,
    ImageUploadSingleComponent,
    ErrorComponent,

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
