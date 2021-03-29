import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {appendApiUrl} from '../../utils/append-api-url.util';
import {ILogInBody} from '../../models/log-in-body.model';
import {IUser} from '../../models/user.model';
import {Router} from '@angular/router';
import {getParsedFromLocalStorage, storeStringifiedInLocalStorage,} from '../../utils/local-storage.util';
import {tap} from 'rxjs/operators';
import {LocalStorageKey} from '../../enum/local-storage-key.enum';

@Injectable({
  providedIn: 'root',
})
export class LogInService {
  public userBS: BehaviorSubject<IUser | null>;
  public urlToNavigateAfterLogIn: string | null;

  constructor(private router: Router, private http: HttpClient) {
    this.userBS = new BehaviorSubject<IUser | null>(
      getParsedFromLocalStorage(LocalStorageKey.USER)
    );
    this.urlToNavigateAfterLogIn = null;
  }

  public logIn(body: ILogInBody): Observable<any> {
    return this.http.post<any>(appendApiUrl('/auth/login'), body).pipe(
      tap((response) => {
        const user: IUser = response.user;
        user.token = response.token;
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        storeStringifiedInLocalStorage(LocalStorageKey.USER, user);
        this.userBS.next(user);
      })
    );
  }

  public logOut(): Observable<any | null> {
    const user: IUser | null = getParsedFromLocalStorage(LocalStorageKey.USER);
    return (
      (user?.token
        ? this.http.get<void>(appendApiUrl('/auth/logout'))
        : of(null)
      )
        // @ts-ignore
        .pipe(tap(() => this.logOutLocally()))
    );
  }

  private logOutLocally(): void {
    localStorage.removeItem(LocalStorageKey.USER);
    this.userBS.next(null);
    this.router.navigate(['/login']).then();
  }
}
