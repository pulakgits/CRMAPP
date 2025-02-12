import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonService } from '../../../services/common.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-usermodel',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-usermodel.component.html',
  styleUrl: './add-usermodel.component.css'
})
export class AddUsermodelComponent {

  @Output() close = new EventEmitter<void>();
  @Output() userAdded = new EventEmitter<any>();

  userForm: FormGroup;
  isSaving = false;
  private fb = inject(FormBuilder);
  private commonService = inject(CommonService);

  constructor() {
    this.userForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      fhname: ['', Validators.required],
      gender: ['', Validators.required],
      birthdate: ['', Validators.required],
      bloodgroup: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', Validators.required],
      city: ['', Validators.required],
      pin: ['', Validators.required],
      aadharno: ['', Validators.required],
      panno: ['', Validators.required],
      pfno: ['', Validators.required],
      esino: ['', Validators.required],
      // role: ['', Validators.required],
      office: ['', Validators.required],
      shift: ['', Validators.required],
      skilltype: ['', Validators.required],
      managerid: ['', Validators.required],
      joindate: ['', Validators.required],
      status: ['', Validators.required],
      bank: ['', Validators.required],
      branch: ['', Validators.required],
      ifsc: ['', Validators.required],
      accountno: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  saveUser() {
    if (this.userForm.invalid) return;

    
    this.isSaving = true;

    this.commonService.addUser(this.userForm.value).subscribe({
      next: (response) => {
        this.userAdded.emit(response);
        this.close.emit();
        this.isSaving = false;
      },
      error: (err) => {
        console.error('Error saving user:', err);
        alert('Failed to save user.');
        this.isSaving = false;
      }
    });

    // console.log('User form:', this.userForm.value);
  }

  closeModal() {
    this.close.emit();
  }
}
