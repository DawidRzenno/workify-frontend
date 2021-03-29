import {Component} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators,} from '@angular/forms';
import {LogInBody} from '../../models/log-in-body.model';
import {LogInService} from './log-in.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss'],
})
export class LogInComponent {
  logInForm: FormGroup;
  loading: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private logInService: LogInService,
    private router: Router
  ) {
    this.logInForm = formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      rememberMe: [{ value: false, disabled: true }],
    });
    this.loading = false;
  }

  public get email(): AbstractControl | null {
    return this.logInForm.get('email');
  }

  public get password(): AbstractControl | null {
    return this.logInForm.get('password');
  }

  public logIn(): void {
    this.loading = true;
    const body = new LogInBody(this.email?.value, this.password?.value);
    const urlToNavigateAfterLogIn = this.logInService.urlToNavigateAfterLogIn;
    this.logInService
      .logIn(body)
      .subscribe(
        () => {
          this.router
            .navigate([
              urlToNavigateAfterLogIn ? urlToNavigateAfterLogIn : '/home',
            ])
            .then();
        },
        (errorResponse) => {
          console.error(errorResponse);
        }
      )
      .add(() => (this.loading = false));
  }
}
