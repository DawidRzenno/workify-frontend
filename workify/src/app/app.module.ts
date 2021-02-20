import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './home/home.component';
import { LogInComponent } from './log-in/log-in.component';
import { TimeTrackerComponent } from './time-tracker/time-tracker.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { CalendarComponent } from './calendar/calendar.component';
import { NotepadComponent } from './notepad/notepad.component';
import { ProjectComponent } from './project/project.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LogInComponent,
    TimeTrackerComponent,
    NotFoundComponent,
    CalendarComponent,
    NotepadComponent,
    ProjectComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
