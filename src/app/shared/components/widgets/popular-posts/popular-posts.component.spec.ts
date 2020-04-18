import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopularPostsComponent } from './popular-posts.component';
import { PopularPostsCardComponent } from '../../cards/popular-posts-card/popular-posts-card.component';

describe('PopularPostsComponent', () => {
  let component: PopularPostsComponent;
  let fixture: ComponentFixture<PopularPostsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopularPostsComponent, PopularPostsCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopularPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
