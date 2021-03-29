import {Component, OnInit} from '@angular/core';
import {IUser} from '../../models/user.model';
import {getParsedFromLocalStorage} from '../../utils/local-storage.util';
import {LocalStorageKey} from '../../enum/local-storage-key.enum';

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

  ngOnInit(): void {
    this.loadExternalScript(
      'https://platform.linkedin.com/badges/js/profile.js'
    );
  }

  public loadExternalScript(src: string): void {
    const script = document.createElement('script');
    script.setAttribute('src', src);
    script.setAttribute('type', 'text/javascript');
    script.setAttribute('async', '');
    script.setAttribute('defer', '');
    document.head.appendChild(script);
  }
}
