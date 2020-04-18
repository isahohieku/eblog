import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileComponent } from './profile.component';
import { PostCardComponent } from '../shared/components/cards/post-card/post-card.component';
import { LoaderComponent } from '../shared/components/misc/loader/loader.component';
import { ProfileCardComponent } from '../shared/components/cards/profile-card/profile-card.component';
import { RouterTestingModule } from '@angular/router/testing';
import { PostMetaCardComponent } from '../shared/components/cards/post-meta-card/post-meta-card.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ArticleService } from '../article/article.service';
import { CrudService } from '../core/services/crud.service';
import { of } from 'rxjs';
import { mockArticlesResponse, mockUserResponse } from '../shared/util/mock-user';
import { ToastrModule } from 'ngx-toastr';
import { ImageUploadSingleComponent } from '../shared/image-upload-single/image-upload-single.component';
import { ActivatedRoute } from '@angular/router';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let crudServiceSpy: jasmine.SpyObj<CrudService>;
  let articleServiceSpy: jasmine.SpyObj<ArticleService>;

  beforeEach(async(() => {
    crudServiceSpy = jasmine.createSpyObj('CrudService', ['getResource']);
    articleServiceSpy = jasmine.createSpyObj('ArticleService', ['getArticles']);
    articleServiceSpy.getArticles.and.returnValue(of(mockArticlesResponse));
    crudServiceSpy.getResource.and.returnValue(of(mockUserResponse));
    TestBed.configureTestingModule({
      declarations: [ ProfileComponent, PostMetaCardComponent, PostCardComponent,
        ProfileCardComponent, ImageUploadSingleComponent, LoaderComponent ],
      imports: [RouterTestingModule, HttpClientTestingModule, ToastrModule.forRoot()],
      providers: [
        { provide: ActivatedRoute, useValue: { params: of({username: 'another'}) }},
        { provide: ArticleService, useValue: articleServiceSpy },
        { provide: CrudService, useValue: crudServiceSpy }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
