import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupComponent } from './signup.component';
import { FormsModule, ReactiveFormsModule, NgControl, FormControl } from '@angular/forms';
import { FormControlComponent } from 'src/app/shared/components/forms/form-control/form-control.component';
import { LoaderComponent } from 'src/app/shared/components/misc/loader/loader.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CrudService } from 'src/app/core/services/crud.service';
import { UtilService } from 'src/app/core/services/util.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { mockUser, mockUserResponse } from 'src/app/shared/util/mock-user';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let crudServiceSpy: jasmine.SpyObj<CrudService>;
  let utilServiceSpy: jasmine.SpyObj<UtilService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async(() => {
    const NG_CONTROL_PROVIDER = {
      provide: NgControl,
      useClass: class extends NgControl {
        control = new FormControl();
        // tslint:disable-next-line: no-empty
        viewToModelUpdate() { }
      },
    };
    crudServiceSpy = jasmine.createSpyObj('CrudService', ['postResource']);
    utilServiceSpy = jasmine.createSpyObj('UtilService', ['setToken', 'getUserObject']);
    routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
    TestBed.configureTestingModule({
      declarations: [ SignupComponent, FormControlComponent, LoaderComponent ],
      imports: [FormsModule, RouterTestingModule, HttpClientTestingModule],
      providers: [
        { provide: CrudService, useValue: crudServiceSpy },
        { provide: UtilService, useValue: utilServiceSpy },
        // { provide: Router, useValue: activaedRouteStub }
      ],
    })
    .overrideComponent(FormControlComponent, {
      add: { providers: [NG_CONTROL_PROVIDER] }
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should signup', () => {
    crudServiceSpy.postResource.and.returnValue(of(mockUserResponse));

    component.username = mockUser.username;
    component.email = mockUser.email;
    component.password = 'password';

    fixture.detectChanges();

    component.signUp();

    expect(crudServiceSpy.postResource).toHaveBeenCalled();

  });
});
