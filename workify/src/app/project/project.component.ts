import {Component, OnInit} from '@angular/core';
import {IProject} from '../model/project.model';
import {TimeTrackerService} from '../time-tracker/time-tracker.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
  project: IProject | null;

  constructor(private timeTrackerService: TimeTrackerService, private activatedRoute: ActivatedRoute) {
    this.project = null;
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params.id) {
        this.project = this.timeTrackerService.getProjectById(params.id);
      }
    });
  }
}
