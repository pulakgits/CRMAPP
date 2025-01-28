import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
CommonModule
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
ReactiveFormsModule

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup; // Declare loginForm as a property of the component

  constructor(private router:Router, private fb: FormBuilder) {
    // Initialize the loginForm
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]], // Add email control
      password: ['', [Validators.required, Validators.minLength(6)]], // Add password control
    });
  }

  // Check if a form field is invalid
  isFieldInvalid(fieldName: string): boolean {
    const control = this.loginForm.get(fieldName);
    return control ? control.invalid && (control.dirty || control.touched) : false;
  }

  // Form submission handler
  onSubmit(): void {
    if (this.loginForm.valid) {
      console.log('Form Submitted:', this.loginForm.value);
    } else {
      console.error('Form is invalid!');
    }
  }
  @Output() switchView = new EventEmitter<void>();

  switchToRegister() {
    this.switchView.emit(); // Emit event to switch to register component
  }

}
