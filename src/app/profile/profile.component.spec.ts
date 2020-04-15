import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileComponent } from './profile.component';
import { PostCardComponent } from '../shared/components/cards/post-card/post-card.component';
import { LoaderComponent } from '../shared/components/misc/loader/loader.component';
import { ProfileCardComponent } from '../shared/components/cards/profile-card/profile-card.component';
import { RouterTestingModule } from '@angular/router/testing';
import { PostMetaCardComponent } from '../shared/components/cards/post-meta-card/post-meta-card.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileComponent, PostMetaCardComponent, PostCardComponent, ProfileCardComponent, LoaderComponent ],
      imports: [RouterTestingModule, HttpClientTestingModule]
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
