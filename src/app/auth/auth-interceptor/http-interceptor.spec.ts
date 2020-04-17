import { inject, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthInterceptor } from './http-interceptor';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { UtilService } from 'src/app/core/services/util.service';
import { mockUser, mockToken } from 'src/app/shared/util/mock-user';

describe('AuthInterceptor', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                UtilService,
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: AuthInterceptor,
                    multi: true
                }]
        });
    });

    afterEach(inject([HttpTestingController], (httpMock: HttpTestingController) => {
        httpMock.verify();
        localStorage.clear();
    }));

    describe('Auth Token available', () => {
        it('includes Authorization header in request',
            inject([HttpClient, HttpTestingController], (http: HttpClient, httpMock: HttpTestingController) => {
                localStorage.setItem('token', JSON.stringify(mockToken));

                http.get('/data').subscribe(response => expect(response).toBeTruthy());

                const req = httpMock.expectOne(r => r.url === '/data' && r.method === 'GET');
                expect(req.request.method).toEqual('GET');
                expect(req.request.headers.has('Authorization')).toBeTruthy();

                req.flush({ hello: 'world' });
                httpMock.verify();
            }));
    });

    describe('No Auth Token available', () => {
        it('does not include Authorization header in request',
            inject([HttpClient, HttpTestingController], (http: HttpClient, httpMock: HttpTestingController) => {

                http.get('/data').subscribe(response => expect(response).toBeTruthy());

                const req = httpMock.expectOne(r => r.url === '/data' && r.method === 'GET');
                expect(req.request.method).toEqual('GET');
                expect(req.request.headers.has('Authorization')).toBeFalsy();

                req.flush({ hello: 'world' });
                httpMock.verify();
            }));
    });
});
