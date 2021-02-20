import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {createUrl} from '../constants';
import {Observable} from 'rxjs';
import {ILogInBody} from '../model/log-in-body.model';


@Injectable({
    providedIn: 'root'
})
export class RegisterService {

    constructor(private http: HttpClient) {
    }

    register(body: ILogInBody): Observable<any> {
        return this.http.post(createUrl('/auth/register'), body);
    }
}
