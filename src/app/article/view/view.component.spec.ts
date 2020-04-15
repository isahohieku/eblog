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

describe('ViewComponent', () => {
  let component: ViewComponent;
  let fixture: ComponentFixture<ViewComponent>;

  beforeEach(async(() => {
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
      imports: [FormsModule, RouterTestingModule, HttpClientTestingModule]
    })
    .overrideComponent(FormControlComponent, {
      add: { providers: [NG_CONTROL_PROVIDER]}
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
});
