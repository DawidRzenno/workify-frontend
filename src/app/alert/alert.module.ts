import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AlertComponent} from './alert.component';
import {AlertService} from './alert.service';

@NgModule({
  declarations: [AlertComponent],
  imports: [CommonModule],
  exports: [AlertComponent],
  providers: [{ provide: AlertService, useClass: AlertService }],
})
export class AlertModule {}
