import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UtilService } from '../../core/services/util.service';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private token: string;

  constructor(private util: UtilService) { this.token = this.util.getToken(); }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.token) {
      return next.handle(request);
    }
    request = request.clone({
      setHeaders: {
        Authorization: this.token
      }
    });
    return next.handle(request);
  }

}
