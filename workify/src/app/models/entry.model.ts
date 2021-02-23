import {randomDate} from '../utils/random-date.util';

export interface IEntry {
  id: string;
  name: string;
  startDate: Date;
  finishDate: Date;
}

export class Entry implements IEntry {
  id: string;
  name: string;
  startDate: Date;
  finishDate: Date;
  constructor(id: string, name: string, startDate?: Date, finishDate?: Date) {
    this.id = id;
    this.name = name;
    this.startDate = startDate ? startDate : randomDate();
    this.finishDate = finishDate ? finishDate : randomDate();
  }
}
