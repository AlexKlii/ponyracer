import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { AbstractControl, FormControl, NonNullableFormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { AlertComponent } from '../alert/alert.component';
import { FormControlValidationDirective } from '../form-control-validation.directive';
import { FormLabelDirective } from '../form-label.directive';
import { FormLabelValidationDirective } from '../form-label-validation.directive';

@Component({
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, AlertComponent, FormControlValidationDirective, FormLabelDirective, FormLabelValidationDirective],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registrationFailed = false;

  loginCtrl: FormControl<string | null> = this.fb.control('', [Validators.required, Validators.minLength(3)]);

  passwordCtrl: FormControl<string | null> = this.fb.control('', Validators.required);
  confirmCtrl: FormControl<string | null> = this.fb.control('', Validators.required);
  passwordGroup = this.fb.group(
    { password: this.passwordCtrl, confirmPassword: this.confirmCtrl },
    { validators: RegisterComponent.passwordMatch }
  );

  birthYearCtrl: FormControl<number | null> = this.fb.control<number | null>(null, [
    Validators.required,
    Validators.min(1900),
    Validators.max(new Date().getFullYear())
  ]);

  userForm = this.fb.group({
    login: this.loginCtrl,
    passwordForm: this.passwordGroup,
    birthYear: this.birthYearCtrl
  });

  constructor(
    private fb: NonNullableFormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  register(): void {
    const formValue = this.userForm.value;
    this.userService.register(formValue.login!, formValue.passwordForm!.password!, formValue.birthYear!).subscribe({
      next: () => this.router.navigateByUrl('/'),
      error: () => (this.registrationFailed = true)
    });
  }

  static passwordMatch(control: AbstractControl): ValidationErrors | null {
    const password = control.value.password;
    const confirm = control.value.confirmPassword;
    return password === confirm ? null : { matchingError: true };
  }
}
