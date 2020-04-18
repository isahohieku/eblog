import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewComponent } from './view.component';
import { RouterTestingModule } from '@angular/router/testing';
import { TagListComponent } from 'src/app/shared/components/cards/tag-list/tag-list.component';
import { AuthorSmallComponent } from 'src/app/shared/components/cards/author-small/author-small.component';
import { ParsedMdComponent } from 'src/app/shared/components/cards/parsed-md/parsed-md.component';
import { CommentComponent } from 'src/app/shared/components/cards/comment/comment.component';
import { CommentFormComponent } from 'src/app/shared/components/forms/comment-form/comment-form.component';
import { AuthorComponent } from 'src/app/shared/components/widgets/author/author.component';
import { SearchWidgetComponent } from 'src/app/shared/components/widgets/search-widget/search-widget.component';
import { PopularCategoriesComponent } from 'src/app/shared/components/widgets/popular-categories/popular-categories.component';
import { PopularPostsComponent } from 'src/app/shared/components/widgets/popular-posts/popular-posts.component';
import { LoaderComponent } from 'src/app/shared/components/misc/loader/loader.component';
import { TextareaComponent } from 'src/app/shared/components/forms/textarea/textarea.component';
import { FormsModule, NgControl, FormControl } from '@angular/forms';
import { FormControlComponent } from 'src/app/shared/components/forms/form-control/form-control.component';
// tslint:disable-next-line:max-line-length
import { PostCategoriesItemCardComponent } from 'src/app/shared/components/misc/post-categories-item-card/post-categories-item-card.component';
import { PopularPostsCardComponent } from 'src/app/shared/components/cards/popular-posts-card/popular-posts-card.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UtilService } from 'src/app/core/services/util.service';
import { of } from 'rxjs';
import { mockUser, mockArticleResponse, mockCommentsResponse, mockComment } from 'src/app/shared/util/mock-user';
import { ArticleService } from '../article.service';
import { ToastrModule } from 'ngx-toastr';
import { CloudinaryModule, CloudinaryConfiguration } from '@cloudinary/angular-5.x';
import { Cloudinary as cloudinary_core } from 'cloudinary-core';

describe('ViewComponent', () => {
  let component: ViewComponent;
  let fixture: ComponentFixture<ViewComponent>;
  let crudServiceSpy: jasmine.SpyObj<ArticleService>;
  let utilServiceSpy: jasmine.SpyObj<UtilService>;

  const cloudinary = {
    Cloudinary: cloudinary_core
  };

  const config: CloudinaryConfiguration = {
    cloud_name: 'hello'
  };


  beforeEach(async(() => {
    utilServiceSpy = jasmine.createSpyObj('UtilService', ['getUserObject']);
    crudServiceSpy = jasmine.createSpyObj('ArticleService',
      ['getArticle', 'getComments', 'deleteArticle', 'favouriteArticle', 'unFavouriteArticle']);
    crudServiceSpy.getArticle.and.returnValue(of(mockArticleResponse));
    crudServiceSpy.getComments.and.returnValue(of(mockCommentsResponse));
    crudServiceSpy.deleteArticle.and.returnValue(of(mockArticleResponse));
    crudServiceSpy.favouriteArticle.and.returnValue(of(mockArticleResponse));
    crudServiceSpy.unFavouriteArticle.and.returnValue(of(mockArticleResponse));

    const NG_CONTROL_PROVIDER = {
      provide: NgControl,
      useClass: class extends NgControl {
        control = new FormControl();
        // tslint:disable-next-line: no-empty
        viewToModelUpdate() { }
      },
    };
    TestBed.configureTestingModule({
      declarations: [
        ViewComponent,
        TagListComponent,
        AuthorSmallComponent,
        ParsedMdComponent,
        CommentComponent,
        CommentFormComponent,
        AuthorComponent,
        SearchWidgetComponent,
        PopularCategoriesComponent,
        PopularPostsComponent,
        LoaderComponent,
        TextareaComponent,
        FormControlComponent,
        PostCategoriesItemCardComponent,
        PopularPostsCardComponent,
      ],
      imports: [
        FormsModule,
        RouterTestingModule,
        HttpClientTestingModule,
        ToastrModule.forRoot(),
        CloudinaryModule,
        CloudinaryModule.forRoot(cloudinary, config)
      ],
      providers: [
        { provide: ArticleService, useValue: crudServiceSpy },
        { provide: UtilService, useValue: utilServiceSpy },
      ]
    })
      .overrideComponent(FormControlComponent, {
        add: { providers: [NG_CONTROL_PROVIDER] }
      })
      .overrideComponent(TextareaComponent, {
        add: { providers: [NG_CONTROL_PROVIDER] }
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get article', () => {
    localStorage.setItem('userObj', JSON.stringify(mockUser));
    component.getArticle();

    expect(crudServiceSpy.getArticle).toHaveBeenCalled();
  });

  it('should get comments', () => {
    component.getComments();

    expect(crudServiceSpy.getComments).toHaveBeenCalled();
  });

  it('should delete article', () => {
    component.deleteArticle();

    expect(crudServiceSpy.deleteArticle).toHaveBeenCalled();
  });

  it('should favourite article', () => {
    component.favouriteArticle();

    expect(crudServiceSpy.favouriteArticle).toHaveBeenCalled();
  });

  it('should unfavourite article', () => {
    component.article.favorited = true;
    component.favouriteArticle();

    expect(crudServiceSpy.unFavouriteArticle).toHaveBeenCalled();
  });

  it('should add comment', () => {
    const length = component.comments.length;
    component.commentAdded(mockComment);

    expect(component.comments.length).toBeGreaterThan(length);
  });

  it('should remove comment', () => {
    const comments = Array(5).fill(mockComment);
    component.comments = comments;

    component.deleteComment(2);

    expect(component.comments.length).toBeLessThan(5);
  });
});
