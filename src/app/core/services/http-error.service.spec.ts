import { TestBed, fakeAsync, tick, flush } from '@angular/core/testing';

import { HttpErrorService, HandleError } from './http-error.service';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { HttpErrorResponse, HttpHeaderResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

describe('HttpErrorService', () => {
  let service: HttpErrorService;
  let toastrServiceSpy: jasmine.SpyObj<ToastrService>;
  beforeEach(() => {
    toastrServiceSpy = jasmine.createSpyObj('ToastrService', ['error']);

    TestBed.configureTestingModule({
      imports: [ToastrModule.forRoot()],
      providers: [ToastrService, HttpErrorService]
    });

    service = TestBed.get(HttpErrorService);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should handle 422 error', fakeAsync(() => {
    let result;
    const handleError: HandleError = service.createHandleError();
    handleError('hello')({
      status: 422,
      error: {
        errors: {
          body: ['Error found']
        }
      }
    } as HttpErrorResponse).pipe(catchError(service.handleError('error'))).subscribe(res => {
      result = res;
    });
    tick();
    expect(result).toEqual({});
    flush();
  }));

  it('should handle error 500', fakeAsync(() => {
    let result;
    const error = {
      status: 500,
      error: {
        message: 'Hello there'
      }
    };
    const handleError: HandleError = service.createHandleError();
    handleError('hello', error)(error as HttpErrorResponse).subscribe(res => {
      result = res;
    });
    tick(10);
    expect(result).toEqual(error);
    expect(handleError).not.toThrow('An error');
    flush();
  }));
});
