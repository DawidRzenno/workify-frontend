import {Component} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LogInService} from '../log-in/log-in.service';
import {RegisterBody} from '../model/register-body.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private logInService: LogInService) {
    this.registerForm = formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      passwordConfirmation: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  get name(): AbstractControl | null {
    return this.registerForm.get('name');
  }

  get email(): AbstractControl | null {
    return this.registerForm.get('email');
  }

  get password(): AbstractControl | null {
    return this.registerForm.get('password');
  }

  get passwordConfirmation(): AbstractControl | null {
    return this.registerForm.get('passwordConfirmation');
  }

  register(): void {
    const body = new RegisterBody(this.email?.value, this.email?.value, this.password?.value, this.passwordConfirmation?.value);
    this.logInService.logIn(body).subscribe(response => console.log(response.body));
  }


}
