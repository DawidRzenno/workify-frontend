import {Component} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LogInBody} from '../model/log-in-body.model';
import {LogInService} from './log-in.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent {
  logInForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private logInService: LogInService) {
    this.logInForm = formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      rememberMe: [{value: false, disabled: true}]
    });
  }

  get email(): AbstractControl | null {
    return this.logInForm.get('email');
  }

  get password(): AbstractControl | null {
    return this.logInForm.get('password');
  }

  logIn(): void {
    const body = new LogInBody(this.email?.value, this.password?.value);
    this.logInService.logIn(body).subscribe(
      response => console.log(response.body));
  }
}
