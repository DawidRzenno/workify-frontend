import {Component, OnInit} from '@angular/core';
import {IProject} from '../../models/project.model';
import {TimeTrackerService} from './time-tracker.service';
import {HttpErrorResponse, HttpParams, HttpResponse,} from '@angular/common/http';
import {AlertService} from '../../alert/alert.service';
import {Alert} from '../../models/alert.model';
import {AlertType} from '../../enum/alert-type.enum';
import {LocalStorageKey} from '../../enum/local-storage-key.enum';

@Component({
  selector: 'app-time-tracker',
  templateUrl: './time-tracker.component.html',
  styleUrls: ['./time-tracker.component.scss'],
})
export class TimeTrackerComponent implements OnInit {
  public projects: IProject[];
  public loading: boolean;
  public colWidth: number;
  public entriesAmount: number;

  constructor(
    private timeTrackerService: TimeTrackerService,
    private alertService: AlertService
  ) {
    this.projects = [];
    this.loading = false;
    this.colWidth = 6;
    this.entriesAmount = 10;
  }

  private static get storedColWidth(): number {
    return JSON.parse(
      localStorage.getItem(LocalStorageKey.COL_WIDTH) as string
    );
  }

  private static get storedEntriesAmount(): number {
    return JSON.parse(
      localStorage.getItem(LocalStorageKey.ENTRIES_AMOUNT) as string
    );
  }

  public ngOnInit(): void {
    this.getPropertiesFromLocalStorage();
    this.loadProjects();
  }

  private loadProjects(params?: HttpParams): void {
    this.loading = true;
    this.timeTrackerService
      .getProjects(params)
      .subscribe({
        next: (response: HttpResponse<IProject[]>) =>
          (this.projects = response.body ? response.body : []),
        error: (errorResponse: HttpErrorResponse) =>
          this.alertService.sendAlert(
            new Alert(errorResponse.message, AlertType.DANGER)
          ),
      })
      .add(() => (this.loading = false));
  }

  private getPropertiesFromLocalStorage(): void {
    this.colWidth = TimeTrackerComponent.storedColWidth
      ? TimeTrackerComponent.storedColWidth
      : this.colWidth;
    this.entriesAmount = TimeTrackerComponent.storedEntriesAmount
      ? TimeTrackerComponent.storedEntriesAmount
      : this.colWidth;
  }

  public setAndStoreColWidth(colWidth: number): void {
    this.colWidth = colWidth;
    localStorage.setItem(LocalStorageKey.COL_WIDTH, JSON.stringify(colWidth));
  }

  public setAndStoreEntriesAmount(entriesAmount: number): void {
    this.entriesAmount = entriesAmount;
    localStorage.setItem(
      LocalStorageKey.ENTRIES_AMOUNT,
      JSON.stringify(entriesAmount)
    );
    this.loadProjects(
      new HttpParams().set('entriesAmount', entriesAmount.toString())
    );
  }
}
