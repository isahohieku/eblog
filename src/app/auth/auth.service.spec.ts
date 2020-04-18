import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { AuthService } from './auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { UtilService } from '../core/services/util.service';
import { mockUser } from '../shared/util/mock-user';
import { ToastrModule } from 'ngx-toastr';

describe('AuthService', () => {
  let httpTestingController: HttpTestingController;
  let auth: AuthService;
  let util: jasmine.SpyObj<UtilService>;
  beforeEach(() => {
    util = jasmine.createSpyObj('UtilService', ['getUserObject']);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, ToastrModule.forRoot()],
      providers: [AuthService, UtilService]
    });
    httpTestingController = TestBed.get(HttpTestingController);
    auth = TestBed.get(AuthService);
  });

  it('should be created', () => {
    expect(auth).toBeTruthy();
  });

  it('should get user login status', () => {
    auth.setLoginStatus(true);

    expect(auth.getLoginStatus()).toBeTruthy();
  });

  it('should logout', () => {
    auth.logout();
    let result: boolean;
    auth.listenToLoginStatus().subscribe(res => result = res).unsubscribe();
    expect(result).toBeFalsy();
  });
});
