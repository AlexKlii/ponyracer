import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'pr-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  loginCtrl: FormControl<string | null> = this.fb.control('', Validators.required);
  passwordCtrl: FormControl<string | null> = this.fb.control('', Validators.required);
  birthYearCtrl: FormControl<number | null> = this.fb.control<number | null>(null, Validators.required);

  userForm = this.fb.group({
    login: this.loginCtrl,
    password: this.passwordCtrl,
    birthYear: this.birthYearCtrl
  });

  constructor(private fb: NonNullableFormBuilder) {}

  register(): void {}
}
