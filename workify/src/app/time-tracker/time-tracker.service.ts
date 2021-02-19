import {Injectable} from '@angular/core';
import {IProject, Project} from '../model/project.model';
import {Entry} from '../model/entry.model';

interface IFakeDatabase {
  projects: IProject[];
}

@Injectable({
  providedIn: 'root'
})
export class TimeTrackerService {

  private fakeDatabase: IFakeDatabase = {
    projects: TimeTrackerService.projects
  };

  constructor() {}

  private static get projects(): IProject[] {
    const projects: IProject[] = [];
    for (let i = 0; i < 5; i++) {
      const project = new Project(i + 'pid', i + 'pname', []);
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

}
