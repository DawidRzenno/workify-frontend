import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest,} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {LogInService} from '../components/log-in/log-in.service';
import {API_URL} from '../utils/append-api-url.util';
import {IUser} from '../models/user.model';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private logInService: LogInService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // add auth header with jwt if user is logged in and request is to the api url
    const user: IUser | null = this.logInService.userBS.getValue();
    const isApiUrl = request.url.startsWith(API_URL);
    if (user?.token && isApiUrl) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      console.log('Appended Token Bearer', request);
    }
    return next.handle(request);
  }
}
