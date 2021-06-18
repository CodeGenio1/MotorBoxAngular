import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { delay, finalize, retryWhen, take, tap } from 'rxjs/operators';
import { HttpStateService } from "../http-state.service";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {
  private totalRequests = 0;
  private exceptions: string[] = [
    'login'
  ];

  constructor(
    private httpStateService: HttpStateService) {

  }

  /**
   * Intercepts all requests
   * - in case of an error (network errors included) it repeats a request 3 times
   * - all other error can be handled an error specific case
   * and redirects into specific error pages if necessary
   *
   * There is an exception list for specific URL patterns that we don't want the application to act
   * automatically
   *
   * The interceptor also reports back to the httpStateService when a certain requests started and ended
   */
  intercept(request: HttpRequest<any>, next: HttpHandler) {
    this.totalRequests++;
    this.httpStateService.state.next(true);

    return next.handle(request).pipe(
      finalize(() => {
        this.totalRequests--;
        if (this.totalRequests === 0) {
          this.httpStateService.state.next(false);
        }
      })
    );
  }
}
