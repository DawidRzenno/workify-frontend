import {Component, OnInit} from '@angular/core';
import {IProject} from '../model/project.model';
import {TimeTrackerService} from './time-tracker.service';

@Component({
  selector: 'app-time-tracker',
  templateUrl: './time-tracker.component.html',
  styleUrls: ['./time-tracker.component.scss']
})
export class TimeTrackerComponent implements OnInit {
  projects: IProject[];
  colWidth: number;

  constructor(private timeTrackerService: TimeTrackerService) {
    this.projects = [];
    this.colWidth = 6;
  }

  ngOnInit(): void {
    this.projects = this.timeTrackerService.getProjects();
  }

  // getFilteredEntries(id: string): IEntry[] {
  //   return this.entries.filter(entry => entry.projectId === id);
  // }

}
