import {Injectable} from '@angular/core';
import {IProject} from '../../models/project.model';
import {Observable} from 'rxjs';
import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';
import {appendApiUrl} from '../../utils/append-api-url.util';
import {IEntry} from '../../models/entry.model';
import {getRandomNumber} from '../../utils/random.util';

export interface ITimeTrackerService {
  getProjects(params?: HttpParams): Observable<HttpResponse<IProject[]>>;
  getProjectById(id: string): Observable<HttpResponse<IProject>>;
  deleteEntry(id: string): Observable<HttpResponse<null>>;
  saveEntry(entry: IEntry): Observable<HttpResponse<IEntry>>;
}

@Injectable()
export class TimeTrackerService implements ITimeTrackerService {
  constructor(private httpClient: HttpClient) {}

  public getProjects(
    params?: HttpParams
  ): Observable<HttpResponse<IProject[]>> {
    return this.httpClient.get<HttpResponse<IProject[]>>(
      appendApiUrl(`/project`),
      { params }
    );
  }

  public getProjectById(id: string): Observable<HttpResponse<IProject>> {
    return this.httpClient.get<HttpResponse<IProject>>(
      appendApiUrl(`/project/${id}`)
    );
  }

  public deleteEntry(id: string): Observable<HttpResponse<null>> {
    return this.httpClient.delete<HttpResponse<null>>(
      appendApiUrl(`/project/${id}`)
    );
  }

  public saveEntry(entry: IEntry): Observable<HttpResponse<IEntry>> {
    if (!entry.id) {
      entry.id = getRandomNumber(0, 100).toString();
    }
    return entry.id
      ? this.httpClient.put<HttpResponse<IEntry>>(
          appendApiUrl(`/project/${entry.id}`),
          entry
        )
      : this.httpClient.post<HttpResponse<IEntry>>(
          appendApiUrl(`/project`),
          entry
        );
  }
}
