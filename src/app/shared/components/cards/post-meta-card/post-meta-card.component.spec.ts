import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostMetaCardComponent } from './post-meta-card.component';

describe('PostMetaCardComponent', () => {
  let component: PostMetaCardComponent;
  let fixture: ComponentFixture<PostMetaCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostMetaCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostMetaCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
