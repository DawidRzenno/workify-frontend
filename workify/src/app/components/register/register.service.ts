import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { appendApiUrl } from '../../utils/create-url.util';
import { Observable } from 'rxjs';
import { ILogInBody } from '../../models/log-in-body.model';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor(private http: HttpClient) {}

  register(body: ILogInBody): Observable<any> {
    return this.http.post(appendApiUrl('/auth/register'), body);
  }
}
