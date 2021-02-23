import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { TimeTrackerComponent } from './components/time-tracker/time-tracker.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { NotepadComponent } from './components/notepad/notepad.component';
import { ProjectComponent } from './components/project/project.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './components/guards/auth.guard';
import { UserComponent } from './components/user/user.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'time-tracker',
    component: TimeTrackerComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'time-tracker/project/:id',
    component: ProjectComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'calendar',
    component: CalendarComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'notepad',
    component: NotepadComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'user/:id',
    // there's a resolver needed for User
    component: UserComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'log-in',
    component: LogInComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'not-found',
    component: NotFoundComponent,
  },
  {
    path: '**',
    redirectTo: 'not-found',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
