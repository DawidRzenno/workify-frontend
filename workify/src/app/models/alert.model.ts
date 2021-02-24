import { AlertType } from '../enum/alert-type.enum';

export interface IAlert {
  message: string;
  type: AlertType;
}

export class Alert implements IAlert {
  message: string;
  type: AlertType;
  constructor(message: string, type: AlertType) {
    this.message = message;
    this.type = type;
  }
}
