import { Injectable } from '@angular/core';
import { IProject, Project } from '../../models/project.model';
import { Entry } from '../../models/entry.model';
import { LocalStorageKey } from '../log-in/log-in.service';
import { getParsedFromLocalStorage } from '../../utils/local-storage.util';

interface IFakeDatabase {
  projects: IProject[];
}

@Injectable({
  providedIn: 'root',
})
export class TimeTrackerService {
  private fakeDatabase: IFakeDatabase = {
    projects: TimeTrackerService.projects,
  };

  private static get projects(): IProject[] {
    const projects: IProject[] = [];
    for (let i = 0; i < 5; i++) {
      const project = new Project(
        i + 'pid',
        i + 'pname',
        [],
        getParsedFromLocalStorage(LocalStorageKey.USER)
      );
      const random = Math.floor(Math.random() * 5) + 1;
      for (let j = 0; j < random; j++) {
        project.entries.push(new Entry(j + 'eid', j + 'ename'));
      }
      projects.push(project);
    }
    return projects;
  }

  public getProjects(): IProject[] {
    return this.fakeDatabase.projects;
  }

  public getProjectById(id: string): IProject {
    return this.fakeDatabase.projects.filter((project) => (project.id = id))[0];
  }
}
