import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageUploadSingleComponent } from './image-upload-single.component';
import { CloudinaryModule, CloudinaryConfiguration } from '@cloudinary/angular-5.x';
import { Cloudinary as cloudinary_core } from 'cloudinary-core';

const cloudinaryConfigs: CloudinaryConfiguration = {
  cloud_name: 'sdfsdffsdf'
};

describe('ImageUploadSingleComponent', () => {
  let component: ImageUploadSingleComponent;
  let fixture: ComponentFixture<ImageUploadSingleComponent>;

  const cloudinary = {
    Cloudinary: cloudinary_core
  };

  const config: CloudinaryConfiguration = cloudinaryConfigs;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ImageUploadSingleComponent],
      imports: [CloudinaryModule.forRoot(cloudinary, config)]
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
