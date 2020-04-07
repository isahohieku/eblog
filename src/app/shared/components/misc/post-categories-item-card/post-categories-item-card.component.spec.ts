import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostCategoriesItemCardComponent } from './post-categories-item-card.component';

describe('PostCategoriesItemCardComponent', () => {
  let component: PostCategoriesItemCardComponent;
  let fixture: ComponentFixture<PostCategoriesItemCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostCategoriesItemCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostCategoriesItemCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
