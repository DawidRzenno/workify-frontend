import {NgbTimeStruct} from '@ng-bootstrap/ng-bootstrap';

export interface IEntry {
  id: string;
  name: string;
  projectId: string;
  startDate: Date;
  stopDate: Date;

  startDateAsString: string;
  stopDateAsString: string;
}

export class Entry implements IEntry {
  public id: string;
  public name: string;
  public projectId: string;
  public startDate: Date;
  public stopDate: Date;
  constructor(
    id: string,
    name: string,
    projectId: string,
    startHoursAndMinutes?: Date,
    stopHoursAndMinutes?: Date
  ) {
    this.id = id;
    this.name = name;
    this.projectId = projectId;
    this.startDate = startHoursAndMinutes ? startHoursAndMinutes : new Date();
    this.stopDate = stopHoursAndMinutes ? stopHoursAndMinutes : new Date();
  }

  private static addLeadingZeroIfNecessary(singleNumber: number): string {
    return singleNumber < 10
      ? '0' + singleNumber.toString()
      : singleNumber.toString();
  }

  public get startDateAsString(): string {
    const hhmmss = this.startDate;
    const value = `${Entry.addLeadingZeroIfNecessary(
      hhmmss.hour
    )}:${Entry.addLeadingZeroIfNecessary(hhmmss.minute)}`;
    console.log(`startHoursAndMinutesAsString(): ${value}`);
    return value;
  }

  public get stopDateAsString(): string {
    const hhmmss = this.stopDate;
    const value = `${Entry.addLeadingZeroIfNecessary(
      hhmmss.hour
    )}:${Entry.addLeadingZeroIfNecessary(hhmmss.minute)}`;
    console.log(`finishHoursAndMinutesAsString(): ${value}`);
    return value;
  }

  public get calculatedTimeAsString(): string {
    const hhmmss = this.calculatedTime;
    const value = `${Entry.addLeadingZeroIfNecessary(
      hhmmss.hour
    )}:${Entry.addLeadingZeroIfNecessary(hhmmss.minute)}`;
    console.log(`calculatedTimeAsString(): ${value}`);
    return value;
  }

  private static createDateFromString(timeString: string): NgbTimeStruct {
    let hour: number;
    let minute: number;
    let second: number;
    if (timeString.includes(':')) {
      const splattedTimeString = timeString.split(':');
      hour = +splattedTimeString[0];
      minute = +splattedTimeString[1];
      second = +splattedTimeString[2];
    } else {
      hour = +timeString.slice(0, 1);
      minute = +timeString.slice(2, 3);
      second = +timeString.slice(4, 5);
    }
    return {
      hour,
      minute,
      second,
    };
  }

  public set setStartHoursAndMinutesFromString(timeString: string) {
    this.startDate = Entry.createDateFromString(timeString);
    console.log(
      `setStartHoursAndMinutesFromString(${timeString}): ${this.startDate}`
    );
  }

  public set setStopHoursAndMinutesFromString(timeString: string) {
    this.stopDate = Entry.createDateFromString(timeString);
    console.log(
      `setStopHoursAndMinutesFromString(${timeString}): ${this.stopDate}`
    );
  }

  public set setCalculatedTimeFromString(timeString: string) {
    this.calculatedTime = Entry.createDateFromString(timeString);
    console.log(
      `setCalculatedTimeFromString(${timeString}): ${this.calculatedTime}`
    );
  }
}
