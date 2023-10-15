import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormControl, NonNullableFormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'pr-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
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
