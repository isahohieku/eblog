import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileCardComponent } from './profile-card.component';
import { CrudService } from 'src/app/core/services/crud.service';
import { mockUser, mockProfileResponse } from 'src/app/shared/util/mock-user';
import { of } from 'rxjs';
import { ImageUploadSingleComponent } from 'src/app/shared/image-upload-single/image-upload-single.component';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { CloudinaryModule, CloudinaryConfiguration } from '@cloudinary/angular-5.x';
import { Cloudinary as cloudinary_core } from 'cloudinary-core';
import { SimpleChanges, SimpleChange } from '@angular/core';


describe('ProfileCardComponent', () => {
  let component: ProfileCardComponent;
  let fixture: ComponentFixture<ProfileCardComponent>;
  let crudServiceSpy: jasmine.SpyObj<CrudService>;

  const cloudinary = {
    Cloudinary: cloudinary_core
  };

  const config: CloudinaryConfiguration = {
    cloud_name: 'hello'
  };


  beforeEach(async(() => {
    localStorage.setItem('userObj', JSON.stringify(mockUser));
    crudServiceSpy = jasmine.createSpyObj('CrudService', ['postResource', 'deleteResource', 'updateResource']);
    crudServiceSpy.postResource.and.returnValue(of(mockProfileResponse));
    crudServiceSpy.deleteResource.and.returnValue(of(mockProfileResponse));
    crudServiceSpy.updateResource.and.returnValue(of(mockProfileResponse));
    TestBed.configureTestingModule({
      declarations: [ProfileCardComponent, ImageUploadSingleComponent],
      imports: [
        ToastrModule.forRoot(),
        CloudinaryModule,
        CloudinaryModule.forRoot(cloudinary, config),
      ],
      providers: [
        ToastrService,
        { provide: CrudService, useValue: crudServiceSpy }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    component.user = mockUser;
    expect(component).toBeTruthy();
  });

  it('should get userObject if profile does not belong to user', () => {
    component.user = mockUser;
    component.user.image = 'helo';
    component.userObj = mockUser;

    component.getUserObject();
  });

  it('should get userObject if profile does not belongs to user', () => {
    component.user = mockUser;
    component.user.image = 'helo';
    component.userObj = mockUser;
    component.userObj.image = 'helo';
    component.userObj.bio = 'hello World';
    component.bio = 'hi';

    component.getUserObject();
  });

  it('should create', () => {
    component.user = mockUser;
    component.userObj.image = '';
    component.user.image = '';
    expect(component).toBeTruthy();
  });

  it('should follow', () => {
    component.user = mockUser;
    component.user.following = false;

    component.follow();

    expect(crudServiceSpy.postResource).toHaveBeenCalled();
  });

  it('should unfollow', () => {
    component.user = mockUser;
    component.user.following = true;

    component.follow();

    expect(crudServiceSpy.deleteResource).toHaveBeenCalled();
  });

  it('should update user', () => {
    const imageLink = 'unknownstring';
    component.userObj = mockUser;

    component.uploaded(imageLink);

    expect(crudServiceSpy.updateResource).toHaveBeenCalled();
  });

  it('should test user image change', () => {
    const image = component.userAvatar;
    component.convertedImage('image');

    expect(component.userAvatar).not.toEqual(image);
  });

  it('should update user on ngChanges', () => {
    fixture.detectChanges();

    spyOn(component, 'ngOnChanges').and.callThrough();

    const imageCurrentValue = {
      user: {
        currentValue: '',
        previousValue: mockUser
      }
    };

    const imageClassNameChanges: SimpleChanges = {
      user: new SimpleChange(null, imageCurrentValue, false)
    };
    component.ngOnChanges(imageClassNameChanges);
    fixture.detectChanges();

    expect(component.ngOnChanges).toHaveBeenCalled();
  });
});
