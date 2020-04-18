import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopularPostsCardComponent } from './popular-posts-card.component';

describe('PopularPostsCardComponent', () => {
  let component: PopularPostsCardComponent;
  let fixture: ComponentFixture<PopularPostsCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopularPostsCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopularPostsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
