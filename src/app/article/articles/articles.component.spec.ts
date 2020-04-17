import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';


import { ArticlesComponent } from './articles.component';
import { LoaderComponent } from 'src/app/shared/components/misc/loader/loader.component';
import { PostCardComponent } from 'src/app/shared/components/cards/post-card/post-card.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { AuthorComponent } from 'src/app/shared/components/widgets/author/author.component';
import { PostMetaCardComponent } from 'src/app/shared/components/cards/post-meta-card/post-meta-card.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UtilService } from 'src/app/core/services/util.service';
import { of } from 'rxjs';
import { mockArticle, mockArticlesResponse, mockUser } from 'src/app/shared/util/mock-user';
import { ArticleService } from '../article.service';

describe('ArticlesComponent', () => {
  let component: ArticlesComponent;
  let fixture: ComponentFixture<ArticlesComponent>;
  let crudServiceSpy: jasmine.SpyObj<ArticleService>;

  beforeEach(async(() => {
    localStorage.setItem('userObj', JSON.stringify(mockUser));
    crudServiceSpy = jasmine.createSpyObj('ArticleService', ['getArticles', 'getArticlesFeed']);
    crudServiceSpy.getArticles.and.returnValue(of([mockArticlesResponse]));
    crudServiceSpy.getArticlesFeed.and.returnValue(of([mockArticlesResponse]));

    TestBed.configureTestingModule({
      declarations: [ArticlesComponent, PostCardComponent, LoaderComponent, PostMetaCardComponent, AuthorComponent],
      imports: [RouterTestingModule, HttpClientTestingModule, NgxPaginationModule],
      providers: [
        { provide: ArticleService, useValue: crudServiceSpy },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get both global feed', () => {
    component.getArticles();
    expect(crudServiceSpy.getArticles).toHaveBeenCalled();
  });

  it('should get user feed', () => {
    component.getFeeds();
    expect(crudServiceSpy.getArticlesFeed).toHaveBeenCalled();
  });

});
