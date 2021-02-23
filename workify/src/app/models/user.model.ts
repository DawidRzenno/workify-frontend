export interface IUser {
  id: string;
  name: string;
  password: string;
  email: string;
  token: string;
}

export class User {
  id: string;
  name: string;
  password: string;
  email: string;
  token: string;

  constructor(
    id: string,
    name: string,
    password: string,
    email: string,
    token: string
  ) {
    this.id = id;
    this.name = name;
    this.password = password;
    this.email = email;
    this.token = token;
  }
}
