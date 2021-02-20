export interface ILogInBody {
  email: string;
  password: string;
}

export class LogInBody implements ILogInBody{
  email: string;
  password: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
}
