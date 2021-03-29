import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HomeComponent} from './components/home/home.component';
import {LogInComponent} from './components/log-in/log-in.component';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {CalendarComponent} from './components/calendar/calendar.component';
import {NotepadComponent} from './components/notepad/notepad.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {RegisterComponent} from './components/register/register.component';
import {FaIconLibrary, FontAwesomeModule,} from '@fortawesome/angular-fontawesome';
import {ErrorInterceptor} from './interceptors/error.interceptor';
import {UserComponent} from './components/user/user.component';
import {JwtInterceptor} from './interceptors/jwt.interceptor';
import {AlertModule} from './alert/alert.module';
import {TimeTrackerModule} from './components/time-tracker/time-tracker.module';
import {faEdit, faSave, faTimesCircle, faTrashAlt,} from '@fortawesome/free-regular-svg-icons';
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LogInComponent,
    NotFoundComponent,
    CalendarComponent,
    NotepadComponent,
    RegisterComponent,
    UserComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    AlertModule,
    TimeTrackerModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(faIconLibrary: FaIconLibrary) {
    faIconLibrary.addIcons(faEdit);
    faIconLibrary.addIcons(faTrashAlt);
    faIconLibrary.addIcons(faTimesCircle);
    faIconLibrary.addIcons(faSave);
    faIconLibrary.addIcons(faChevronLeft);
  }
}
