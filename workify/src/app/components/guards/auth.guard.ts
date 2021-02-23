import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { LogInService } from '../log-in/log-in.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private logInService: LogInService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.checkIfUserIsLoggedIn(state.url);
  }

  checkIfUserIsLoggedIn(urlToNavigateAfterLogIn: string): boolean | UrlTree {
    if (this.logInService.userBS.getValue()) {
      return true;
    } else {
      this.logInService.urlToNavigateAfterLogIn = urlToNavigateAfterLogIn;
      return this.router.parseUrl('/log-in');
    }
  }
}
