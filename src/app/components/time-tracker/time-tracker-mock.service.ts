import {Injectable} from '@angular/core';
import {IProject, Project} from '../../models/project.model';
import {Observable, of} from 'rxjs';
import {HttpParams, HttpResponse} from '@angular/common/http';
import {Entry, IEntry} from '../../models/entry.model';
import {ITimeTrackerService} from './time-tracker.service';
import {getRandomNumber, getRandomSentence,} from '../../utils/random.util';

@Injectable()
export class TimeTrackerMockService implements ITimeTrackerService {
  private readonly projects: IProject[];

  constructor() {
    this.projects = [];
    for (let i = 0; i < 5; i++) {
      this.projects.push(
        new Project(
          i.toString(),
          getRandomSentence(getRandomNumber(3, 5)),
          [],
          i.toString()
        )
      );
      for (let j = 0; j < getRandomNumber(3, 20); j++) {
        this.projects[i].entries.push(
          new Entry(j.toString(), getRandomSentence(getRandomNumber(3, 30)), '')
        );
      }
    }
  }

  public getProjects(params: HttpParams): Observable<HttpResponse<IProject[]>> {
    return of(new HttpResponse({ body: this.projects }));
  }

  public getProjectById(id: string): Observable<HttpResponse<IProject>> {
    return of(new HttpResponse({ body: this.projects[0] }));
  }

  public deleteEntry(id: string): Observable<HttpResponse<null>> {
    return of(new HttpResponse({ body: null }));
  }

  public saveEntry(entry: IEntry): Observable<HttpResponse<IEntry>> {
    if (entry?.id) {
      this.projects[0].entries.push(entry);
    }
    return of(new HttpResponse({ body: entry }));
  }
}
