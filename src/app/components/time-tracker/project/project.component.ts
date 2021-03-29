import {Component, OnInit} from '@angular/core';
import {IProject} from '../../../models/project.model';
import {TimeTrackerService} from '../time-tracker.service';
import {ActivatedRoute} from '@angular/router';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {AlertService} from '../../../alert/alert.service';
import {Alert} from '../../../models/alert.model';
import {AlertType} from '../../../enum/alert-type.enum';
import {Entry, IEntry} from '../../../models/entry.model';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
})
export class ProjectComponent implements OnInit {
  public project: IProject | null;
  public loading: {
    saveNewEntry: boolean;
    updateEntry: boolean;
    deleteEntry: boolean;
    getProject: boolean;
  };
  public selectedEntry: IEntry | null;
  private selectedEntryBuffered: IEntry | null;
  public entryForm: FormGroup;

  constructor(
    private timeTrackerService: TimeTrackerService,
    private activatedRoute: ActivatedRoute,
    private alertService: AlertService,
    private fb: FormBuilder
  ) {
    this.project = null;
    this.loading = {
      saveNewEntry: false,
      updateEntry: false,
      deleteEntry: false,
      getProject: false,
    };
    this.selectedEntry = null;
    this.selectedEntryBuffered = this.selectedEntry;
    this.entryForm = this.fb.group({
      startDate: null,
      name: null,
      finishDate: null,
      time: null,
    });
  }

  /** TODO - change current time management to this methodology below xD
   *
   * var startDate = new Date();
   * var finishDate = null;
   *
   * console.log('Started...')
   * setInterval(() => {
   *    finishDate = new Date();
   *    console.log(
   *      new Date(
   *        finishDate.getTime() - startDate.getTime()
   *      ).getTime()
   *    )
   * }, 1000);
   *
   */

  public ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params.id) {
        this.loadProjectById(params.id);
      }
    });

    console.log('new Date().toISOString()');
    console.log(new Date().toISOString());
    console.log('new Date()');
    console.log(new Date());
  }

  private loadProjectById(id: string): void {
    this.loading.getProject = true;
    this.timeTrackerService
      .getProjectById(id)
      .subscribe({
        next: (response: HttpResponse<IProject>) =>
          (this.project = response.body),
        error: (errorResponse: HttpErrorResponse) =>
          this.alertService.sendAlert(
            new Alert(errorResponse.message, AlertType.DANGER)
          ),
      })
      .add(() => (this.loading.getProject = false));
  }

  public editEntry(entry: IEntry): void {
    this.selectedEntry = entry;
    this.selectedEntryBuffered = new Entry(
      entry.id,
      entry.name,
      entry.projectId,
      entry.startDate,
      entry.stopDate
    );
  }

  public cancelEditingEntry(): void {
    this.revertChangesInSelectedEntry();
    this.resetEntrySelection();
  }

  public isEntrySelected(entry: IEntry): boolean {
    return this.selectedEntry?.id === entry.id;
  }

  private revertChangesInSelectedEntry(): void {
    const entry = this.selectedEntryBuffered;
    if (entry) {
      this.selectedEntry = new Entry(
        entry.id,
        entry.name,
        entry.projectId,
        entry.startDate,
        entry.stopDate
      );
    }
  }

  public handleSuccessfullyAddedOrUpdatedEntry(entry: IEntry): void {
    if (entry.id) {
      this.project?.entries.push(entry);
    }
  }

  private saveEntry(entry: IEntry, successMessage: string): Subscription {
    return this.timeTrackerService.saveEntry(entry).subscribe({
      next: () => {
        this.handleSuccessfullyAddedOrUpdatedEntry(entry);
        this.alertService.sendAlert(
          new Alert(successMessage, AlertType.SUCCESS)
        );
      },
      error: (errorResponse: HttpErrorResponse) =>
        this.alertService.sendAlert(
          new Alert(errorResponse.message, AlertType.DANGER)
        ),
    });
  }

  private resetEntrySelection(): void {
    this.selectedEntryBuffered = null;
    this.selectedEntry = null;
  }

  public updateEntry(entry: IEntry): void {
    this.resetEntrySelection();
    this.loading.updateEntry = true;
    this.saveEntry(entry, 'Successfully updated an entry').add(() => {
      this.loading.updateEntry = false;
    });
  }

  public createEntry(): void {
    const newEntry = new Entry('', '', '');
    this.loading.saveNewEntry = true;
    this.saveEntry(newEntry, 'Successfully saved an entry').add(() => {
      this.loading.saveNewEntry = false;
    });
  }

  public deleteEntry(entry: IEntry): void {
    this.loading.deleteEntry = true;
    this.timeTrackerService
      .deleteEntry(entry.id)
      .subscribe({
        next: () => {
          if (this.project) {
            this.project.entries = this.project.entries.filter(
              (filteredEntry) => filteredEntry.id !== entry.id
            );
          }
        },
        error: (errorResponse: HttpErrorResponse) =>
          this.alertService.sendAlert(
            new Alert(errorResponse.message, AlertType.DANGER)
          ),
      })
      .add(() => (this.loading.deleteEntry = false));
  }

  public getEntryTime(startDate: Date, finishDate: Date): string {
    return 'TEST';
  }
}
