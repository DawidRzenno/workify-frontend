import { Component, OnDestroy, OnInit } from '@angular/core';
import { LogInService } from './components/log-in/log-in.service';
import { Subscription } from 'rxjs';
import { IUser } from './models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  public title: string;
  public user: IUser | null;
  private infiniteSubscriptions: Subscription;

  constructor(private logInService: LogInService, private router: Router) {
    this.title = 'workify';
    this.user = null;
    this.infiniteSubscriptions = new Subscription();
  }

  private static welcome(): void {
    console.log('._________________.');
    console.log('|                 |');
    console.log('|   Workify 1.0   |');
    console.log('|       by        |');
    console.log('|  Dawid  Rzenno  |');
    console.log('|_________________|');
  }

  public ngOnInit(): void {
    AppComponent.welcome();
    this.watchUser();
  }

  public ngOnDestroy(): void {
    this.infiniteSubscriptions.unsubscribe();
  }

  private watchUser(): void {
    this.user = this.logInService.userBS.getValue();
    this.infiniteSubscriptions.add(
      this.logInService.userBS.subscribe((user) => (this.user = user))
    );
  }

  public logOut(): void {
    this.logInService.logOut().subscribe({
      next: () => this.router.navigate(['/log-in']),
    });
  }
}
