import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { FormsModule, NgControl, NgForm, FormControl } from '@angular/forms';
import { FormControlComponent } from 'src/app/shared/components/forms/form-control/form-control.component';
import { LoaderComponent } from 'src/app/shared/components/misc/loader/loader.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthService } from '../auth.service';
import { CrudService } from 'src/app/core/services/crud.service';
import { UtilService } from 'src/app/core/services/util.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { mockUser } from 'src/app/shared/util/mock-user';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let crudServiceSpy: jasmine.SpyObj<CrudService>;
  let utilServiceSpy: jasmine.SpyObj<UtilService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async(() => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['setLoginStatus']);
    crudServiceSpy = jasmine.createSpyObj('CrudService', ['postResource']);
    utilServiceSpy = jasmine.createSpyObj('UtilService', ['setToken', 'setUserObject']);
    routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

    const NG_CONTROL_PROVIDER = {
      provide: NgControl,
      useClass: class extends NgControl {
        control = new FormControl();
        // tslint:disable-next-line: no-empty
        viewToModelUpdate() { }
      },
    };

    TestBed.configureTestingModule({
      declarations: [LoginComponent, FormControlComponent, LoaderComponent],
      imports: [FormsModule, HttpClientTestingModule],
      providers: [
        { provide: CrudService, useValue: crudServiceSpy },
        { provide: AuthService, useValue: authServiceSpy },
        { provide: UtilService, useValue: utilServiceSpy },
        { provide: Router, useValue: routerSpy }
      ],
    })
      .overrideComponent(FormControlComponent, {
        add: { providers: [NG_CONTROL_PROVIDER] },
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should login', () => {
    crudServiceSpy.postResource.and.returnValue(of({ user: mockUser }));

    component.email = mockUser.email;
    component.password = 'password';

    fixture.detectChanges();

    component.login();

    expect(crudServiceSpy.postResource).toHaveBeenCalled();
    expect(authServiceSpy.setLoginStatus).toHaveBeenCalled();
    expect(utilServiceSpy.setToken).toHaveBeenCalled();
    expect(utilServiceSpy.setUserObject).toHaveBeenCalled();
    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/');

  });

  // it('should not login', fakeAsync(() => {
  //   component.email = 'another';
  //   component.password = 'password';

  //   fixture.detectChanges();

  //   tick(100);

  //   component.login();

  //   expect(crudServiceSpy.postResource).not.toHaveBeenCalled();
  // }));
});
