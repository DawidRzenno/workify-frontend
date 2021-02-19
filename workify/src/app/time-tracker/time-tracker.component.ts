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
    this.colWidth = this.storedColWidth ? this.storedColWidth : this.colWidth;
  }

  setAndStoreColWidth(colWidth: number): void {
    this.colWidth = colWidth;
    localStorage.setItem('colWidth', JSON.stringify(colWidth));
  }

  get storedColWidth(): number {
    return JSON.parse(localStorage.getItem('colWidth') as string);
  }

  // getFilteredEntries(id: string): IEntry[] {
  //   return this.entries.filter(entry => entry.projectId === id);
  // }

}
