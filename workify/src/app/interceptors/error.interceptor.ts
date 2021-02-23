import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { LogInService } from '../components/log-in/log-in.service';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private logInService: LogInService, private router: Router) {}
  public intercept(
    httpRequest: HttpRequest<any>,
    httpHandler: HttpHandler
  ): Observable<HttpEvent<any>> {
    return httpHandler.handle(httpRequest).pipe(
      catchError((err) => {
        if ([401, 403].includes(err.status)) {
          // auto logout if 401 or 403 response returned from api
          this.logInService
            .logOut()
            .subscribe({ complete: () => this.router.navigate(['/log-in']) });
        }
        const error = err.error?.message || err.statusText;
        console.error(err);
        return throwError(error);
      })
    );
  }
}
