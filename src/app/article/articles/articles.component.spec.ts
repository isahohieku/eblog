import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';


import { ArticlesComponent } from './articles.component';
import { Router } from '@angular/router';
import { LoaderComponent } from 'src/app/shared/components/misc/loader/loader.component';
import { PostCardComponent } from 'src/app/shared/components/cards/post-card/post-card.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { AuthorComponent } from 'src/app/shared/components/widgets/author/author.component';
import { PostMetaCardComponent } from 'src/app/shared/components/cards/post-meta-card/post-meta-card.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ArticlesComponent', () => {
  let component: ArticlesComponent;
  let fixture: ComponentFixture<ArticlesComponent>;
  let routerSpy: {
    navigate: jasmine.Spy
  };

  beforeEach(async(() => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    TestBed.configureTestingModule({
      declarations: [ArticlesComponent, PostCardComponent, LoaderComponent, PostMetaCardComponent, AuthorComponent],
      imports: [RouterTestingModule, HttpClientTestingModule, NgxPaginationModule],
      providers: [
        { provide: Router, useValue: routerSpy }
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
});
