import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {createUrl} from '../constants';
import { ILogInBody } from '../model/log-in-body.model';


@Injectable({
  providedIn: 'root'
})
export class LogInService {

  constructor(private http: HttpClient) {}

  logIn(body: ILogInBody): Observable<any> {
    return this.http.post(createUrl('/auth/login'), body);
  }
}
