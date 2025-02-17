import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
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
export class AddUsermodelComponent implements OnInit {
  // Input property to receive user data from the parent component
  @Input() user: any;
  // Output event emitters to notify parent component of changes
  @Output() close = new EventEmitter<void>();
  // @Output() userAdded = new EventEmitter<any>();
  @Output() userUpdate = new EventEmitter<any>();

  // Input property to determine if the component is in edit mode
  @Input() isEditMode: boolean = false;

  // Form group to handle user input fields
  userForm: FormGroup;
  isSaving = false; // Flag to indicate if form is in saving state

  // Injecting required services
  private fb = inject(FormBuilder);
  private commonService = inject(CommonService);
  
  constructor() {
    // Initializing the form with necessary fields and validators
    this.userForm = this.fb.group({
      _id: [''],
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
  
  ngOnInit() {
    // Delay execution slightly to ensure form is initialized before patching values
    setTimeout(() => {
      console.log('User received:', this.user);
      
      // If user data is provided, patch the form with user details
      if (this.user) {
        this.userForm.patchValue(this.user);
      } else {
        console.error('User not found or is undefined:', this.user);
      }
    }, 10);
  }

  // Method to save a new user
  // saveUser() {
    // Prevent submission if the form is invalid
    // if (this.userForm.invalid) return;
    // 
    // this.isSaving = true; // Indicate saving process has started
    // 
    // this.commonService.addUser(this.userForm.value).subscribe({
      // next: (response) => {
        // this.userAdded.emit(response); // Emit event after successful save
        // this.close.emit(); // Close modal
        // this.isSaving = false;
      // },
      // error: (err) => {
        // console.error('Error saving user:', err);
        // alert('Failed to save user.');
        // this.isSaving = false;
      // }
    // });
  // }

  // Method to update an existing user
  updateUser() {
    if (!this.userForm.valid) {
      alert('Please fill all the required fields');
      return;
    }
  
    const updatedUser = {
      ...this.userForm.value,
      _id: this.user?._id
    };
    
    this.commonService.updateUser(updatedUser).subscribe(
      (response) => {
        console.log('User updated successfully:', response);
        this.userUpdate.emit(response); // Emit event to parent
        this.closeModal(); // Close modal
      },
      (error) => {
        console.error('Error updating user:', error);
      }
    );
  }

  // Method to close the modal
  closeModal() {
    this.close.emit();
  }
}