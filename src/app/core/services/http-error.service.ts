import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorService {

  constructor(private toastr: ToastrService) { }

  handleError<T>(operation = 'operation', result = {} as T) {

    return (e: HttpErrorResponse): Observable<T> => {
      let message: string;
      switch (true) {
        case e.status === 422: {
          message = e.error.errors.body[0];
          break;
        }

        default: {
          message = e.message;
        }
      }

      console.log(e);

      // Throw an Error Toast
      this.toastr.error(message, operation);

      // Let the app keep running by returning a safe result when its okay
      return result === null ? throwError(e) : of(result);
    };

  }
}
