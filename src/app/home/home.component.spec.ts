import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { LoaderComponent } from '../shared/components/misc/loader/loader.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { PostCardComponent } from '../shared/components/cards/post-card/post-card.component';
import { AuthorComponent } from '../shared/components/widgets/author/author.component';
import { SearchWidgetComponent } from '../shared/components/widgets/search-widget/search-widget.component';
import { PopularPostsComponent } from '../shared/components/widgets/popular-posts/popular-posts.component';
import { PopularCategoriesComponent } from '../shared/components/widgets/popular-categories/popular-categories.component';
import { RouterTestingModule } from '@angular/router/testing';
import { PostMetaCardComponent } from '../shared/components/cards/post-meta-card/post-meta-card.component';
import { FormControlComponent } from '../shared/components/forms/form-control/form-control.component';
import { PopularPostsCardComponent } from '../shared/components/cards/popular-posts-card/popular-posts-card.component';
import { PostCategoriesItemCardComponent } from '../shared/components/misc/post-categories-item-card/post-categories-item-card.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgControl, FormControl } from '@angular/forms';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

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
        HomeComponent,
        LoaderComponent,
        PostCardComponent,
        AuthorComponent,
        SearchWidgetComponent,
        PopularPostsComponent,
        PopularPostsCardComponent,
        PostCategoriesItemCardComponent,
        PopularCategoriesComponent,
        PostMetaCardComponent,
        FormControlComponent
      ],
      imports: [NgxPaginationModule, RouterTestingModule, HttpClientTestingModule]
    })
      .overrideComponent(FormControlComponent, {
        add: { providers: [NG_CONTROL_PROVIDER] }
      })
      .compileComponents();
  }));

  beforeEach(() => {
    localStorage.setItem('userObj', JSON.stringify({
      username: 'a',
      token: 'b',
      password: 'c',
      bio: 'd',
      email: 'e'
    }));
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
