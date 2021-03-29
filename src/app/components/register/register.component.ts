import {Component} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators,} from '@angular/forms';
import {RegisterBody} from '../../models/register-body.model';
import {RegisterService} from './register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  public registerForm: FormGroup;
  public loading: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private registerService: RegisterService
  ) {
    this.registerForm = formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      passwordConfirmation: [
        '',
        [Validators.required, Validators.minLength(8)],
      ],
    });
    this.loading = false;
  }

  public get name(): AbstractControl | null {
    return this.registerForm.get('name');
  }

  public get email(): AbstractControl | null {
    return this.registerForm.get('email');
  }

  public get password(): AbstractControl | null {
    return this.registerForm.get('password');
  }

  public get passwordConfirmation(): AbstractControl | null {
    return this.registerForm.get('passwordConfirmation');
  }

  public register(): void {
    this.loading = true;
    const body = new RegisterBody(
      this.email?.value,
      this.email?.value,
      this.password?.value,
      this.passwordConfirmation?.value
    );
    this.registerService
      .register(body)
      .subscribe(
        (response) => {
          console.log(response.body);
        },
        (errorResponse) => {
          console.error(errorResponse);
        }
      )
      .add(() => (this.loading = false));
  }
}
