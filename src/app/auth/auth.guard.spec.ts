import { TestBed, async, inject } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

describe('AuthGuard', () => {

  let authGuard: AuthGuard;
  let authServiceSpy: { getLoginStatus: jasmine.Spy };
  let mockRouter: { navigateByUrl: jasmine.Spy };

  beforeEach((done: DoneFn) => {
    mockRouter = { navigateByUrl: jasmine.createSpy('navigateByUrl') };

    authServiceSpy = jasmine.createSpyObj('AuthService', ['getLoginStatus']);
    authServiceSpy.getLoginStatus.and.returnValue(true);

    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: mockRouter }
      ]
    })
      .compileComponents()
      .then(inject([AuthGuard], (authGuardtest: AuthGuard) => {
        authGuard = authGuardtest;
        done();
      }));
  });

  it('should have a canActivate method', () => {
    expect(typeof authGuard.canActivate).toBe('function');
  });

  it('should return true if user is authenticated', () => {
    expect(authGuard.canActivate()).toBe(true);
    expect(authServiceSpy.getLoginStatus).toHaveBeenCalled();
  });

  it('should return false and redirect to login if user is not authenticated', () => {
    authServiceSpy.getLoginStatus.and.returnValue(false);

    // Act
    const result = authGuard.canActivate();

    // Assert
    expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('/login');
    expect(result).toBe(false);
  });
});
