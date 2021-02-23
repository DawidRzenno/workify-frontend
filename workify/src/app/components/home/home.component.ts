import { Component, OnInit } from '@angular/core';
import { IUser } from '../../models/user.model';
import { getParsedFromLocalStorage } from '../../utils/local-storage.util';
import { LocalStorageKey } from '../log-in/log-in.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public user: IUser;

  constructor() {
    this.user = getParsedFromLocalStorage(LocalStorageKey.USER);
  }

  ngOnInit(): void {}
}
