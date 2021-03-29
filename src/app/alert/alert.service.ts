import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {IAlert} from '../models/alert.model';

@Injectable()
export class AlertService {
  public readonly alertEmitter: Subject<IAlert>;

  constructor() {
    this.alertEmitter = new Subject<IAlert>();
  }

  public sendAlert(alert: IAlert): void {
    this.alertEmitter.next(alert);
  }
}
