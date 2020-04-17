import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileCardComponent } from './profile-card.component';
import { CrudService } from 'src/app/core/services/crud.service';
import { mockUser, mockProfileResponse } from 'src/app/shared/util/mock-user';
import { of } from 'rxjs';

describe('ProfileCardComponent', () => {
  let component: ProfileCardComponent;
  let fixture: ComponentFixture<ProfileCardComponent>;
  let crudServiceSpy: jasmine.SpyObj<CrudService>;


  beforeEach(async(() => {
    crudServiceSpy = jasmine.createSpyObj('CrudService', ['postResource', 'deleteResource']);
    crudServiceSpy.postResource.and.returnValue(of(mockProfileResponse));
    crudServiceSpy.deleteResource.and.returnValue(of(mockProfileResponse));
    TestBed.configureTestingModule({
      declarations: [ ProfileCardComponent ],
      providers: [
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
});
