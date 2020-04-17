import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageUploadSingleComponent } from './image-upload-single.component';

describe('ImageUploadSingleComponent', () => {
  let component: ImageUploadSingleComponent;
  let fixture: ComponentFixture<ImageUploadSingleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageUploadSingleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageUploadSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
