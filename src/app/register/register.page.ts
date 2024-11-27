import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { eyeOffOutline, eyeOutline } from 'ionicons/icons';
import {
  AuthenticationService,
  IUser,
} from '../core/services/authentication/authentication.service';
import { REQUIRED_FIELD_MESSAGE } from '../constants/app.constants';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, ReactiveFormsModule],
})
export class RegisterPage implements OnInit {
  public registerForm = new FormGroup(
    {
      fullName: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phoneNumber: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]{10}$'),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    },
    { validators: this.passwordMatchValidator }
  );
  public passwordType = 'password';
  public passwordIcon = 'eye-outline';
  public requiredFieldMessage = REQUIRED_FIELD_MESSAGE;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {
    addIcons({ eyeOutline, eyeOffOutline });
  }

  ngOnInit() {}

  private passwordMatchValidator(
    formGroup: FormGroup
  ): null | { passwordMismatch: true } {
    return formGroup.get('password')?.value ===
      formGroup.get('confirmPassword')?.value
      ? null
      : { passwordMismatch: true };
  }

  public onToggleShowPassword(): void {
    if (this.passwordType === 'password') {
      this.passwordType = 'text';
      this.passwordIcon = 'eye-off-outline';
    } else {
      this.passwordType = 'password';
      this.passwordIcon = 'eye-outline';
    }
  }

  public onSignUp(): void {
    this.authenticationService
      .signUpWithEmailAndPassword(this.registerForm.value as unknown as IUser)
      .then((userCreated: boolean | unknown) => {
        console.log('userCreated : ' + userCreated);
        if (userCreated) {
          this.router.navigate(['car']);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
