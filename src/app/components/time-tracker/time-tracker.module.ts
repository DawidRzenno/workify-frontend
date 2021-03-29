import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TimeTrackerComponent} from './time-tracker.component';
import {ProjectComponent} from './project/project.component';
import {TimeTrackerService} from './time-tracker.service';
import {TimeTrackerMockService} from './time-tracker-mock.service';
import {RouterModule} from '@angular/router';
import {AlertModule} from '../../alert/alert.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [TimeTrackerComponent, ProjectComponent],
  imports: [
    CommonModule,
    AlertModule,
    RouterModule,
    NgbModule,
    FormsModule,
    FontAwesomeModule,
    ReactiveFormsModule,
  ],
  exports: [TimeTrackerComponent, ProjectComponent],
  providers: [
    { provide: TimeTrackerService, useClass: TimeTrackerMockService },
  ],
})
export class TimeTrackerModule {}
