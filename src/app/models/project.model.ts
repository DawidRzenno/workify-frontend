import {IEntry} from './entry.model';

export interface IProject {
  id: string;
  name: string;
  entries: IEntry[];
  userId: string;
}

export class Project implements IProject {
  id: string;
  name: string;
  entries: IEntry[];
  userId: string;

  constructor(id: string, name: string, entries: IEntry[], userId: string) {
    this.id = id;
    this.name = name;
    this.entries = entries;
    this.userId = userId;
  }
}
