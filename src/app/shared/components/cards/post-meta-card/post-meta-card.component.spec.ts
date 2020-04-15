import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostMetaCardComponent } from './post-meta-card.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('PostMetaCardComponent', () => {
  let component: PostMetaCardComponent;
  let fixture: ComponentFixture<PostMetaCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostMetaCardComponent ],
      imports: [
        RouterTestingModule
      ]
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
