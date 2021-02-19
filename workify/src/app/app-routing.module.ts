import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {LogInComponent} from './log-in/log-in.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {TimeTrackerComponent} from './time-tracker/time-tracker.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'time-tracker',
    component: TimeTrackerComponent
  },
  {
    path: 'log-in',
    component: LogInComponent
  },
  {
    path: 'not-found',
    component: NotFoundComponent
  },
  {
    path: '**',
    redirectTo: 'not-found'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
