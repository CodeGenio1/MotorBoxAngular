import { UserService } from 'src/app/services/user.service';


import { Injectable, Inject, LOCALE_ID, OnInit } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
  HttpHeaders
} from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, switchMap, filter, take } from 'rxjs/operators';



/**
 * Adds a default error handler to all requests.
 */
@Injectable({
  providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor, OnInit {
  private isRefreshing: boolean = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(
    private authService: UserService,
    @Inject(LOCALE_ID) private locale?: string
  ) {}

  ngOnInit() {
    this.isRefreshing = false;
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const  accessToken  = this.authService.getToken();
    if (accessToken) {
      request = this.addToken(request, accessToken);
    } else {
      request = request.clone({
        setHeaders: {
          'Access-Control-Allow-Origin': '*'
        }
      });
    }
    return next.handle(request).pipe(
      catchError(error => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          // log.info({ msg: 'refreshing token' });
          this.isRefreshing = false;
          return this.handle401Error(request, next);
        } else {
          return throwError(error);
        }
      })
    );
  }

  private addToken(request: HttpRequest<any>, token: string) {
    const offset: number = new Date().getTimezoneOffset();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      TimezoneOffset: `${offset}`,
      'Accept-Language': this.locale
    });
    return request.clone({
      headers
    });
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.authService.refreshToken(this.authService.getRefreshToken()).pipe(
        switchMap((res: any) => {
          const { access_token } = res;
          this.isRefreshing = false;
          this.refreshTokenSubject.next(access_token);
          return next.handle(this.addToken(request, access_token));
        }),
        catchError(error => {
          this.authService.logout();
          return throwError(error);
        })
      );
    } else {
      return this.refreshTokenSubject.pipe(
        filter(access_token => access_token !== null),
        take(1),
        switchMap(access_token => {
          return next.handle(this.addToken(request, access_token));
        })
      );
    }
  }
}
