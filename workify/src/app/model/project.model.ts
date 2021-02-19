import {IEntry} from './entry.model';

export interface IProject {
  id: string;
  name: string;
  entries: IEntry[];
}

export class Project implements IProject {
  id: string;
  name: string;
  entries: IEntry[];

  constructor(id: string, name: string, entries: IEntry[]) {
    this.id = id;
    this.name = name;
    this.entries = entries;
  }
}
