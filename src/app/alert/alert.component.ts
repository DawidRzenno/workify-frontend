import {Component, OnDestroy, OnInit} from '@angular/core';
import {AlertService} from './alert.service';
import {Subscription, timer} from 'rxjs';
import {IAlert} from '../models/alert.model';
import {AlertType} from '../enum/alert-type.enum';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements OnInit, OnDestroy {
  private alertDueTimeInMs: number;
  public alerts: IAlert[];
  public alertType: typeof AlertType;
  private alertEmitterSubscription: Subscription | null;

  constructor(private alertService: AlertService) {
    this.alertType = AlertType;
    this.alertDueTimeInMs = 3000;
    this.alerts = [];
    this.alertEmitterSubscription = null;
  }

  public ngOnInit(): void {
    this.alertEmitterSubscription = this.alertService.alertEmitter.subscribe(
      (alert: IAlert) => {
        this.alerts.push(alert);
        timer(this.alertDueTimeInMs).subscribe(() => {
          this.alerts.shift();
        });
      }
    );
  }

  public ngOnDestroy(): void {
    this.alertEmitterSubscription?.unsubscribe();
  }
}
