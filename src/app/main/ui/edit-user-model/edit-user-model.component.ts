import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonService } from '../../../services/common.service';

@Component({
  selector: 'app-edit-user-model',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-user-model.component.html',
  styleUrl: './edit-user-model.component.css'
})
export class EditUserModelComponent implements OnInit {
  @Input() user: any; // Get user
  @Output() close = new EventEmitter<void>(); // Emit event to close modal

  @Output() userUpdated = new EventEmitter<any>(); // Emit event when user is updated

  userForm: FormGroup;

  constructor(private fb: FormBuilder, private commonService: CommonService) {
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
      mobile: ['', [Validators.required, Validators.pattern('^[6-9][0-9]{9}$')]], // Valid mobile number (10 digits, starts with 6-9)
      city: ['', Validators.required],
      pin: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]], // 6-digit PIN code validation
      aadharno: ['', [Validators.required, Validators.pattern('^[2-9][0-9]{11}$')]], // 12-digit Aadhaar validation
      panno: ['', [Validators.required, Validators.pattern('^[A-Z]{5}[0-9]{4}[A-Z]{1}$')]], // PAN validation
      pfno: ['', Validators.required],
      esino: ['', Validators.required],
      // role: ['', Validators.required], // Added missing role field
      office: ['', Validators.required],
      shift: ['', Validators.required],
      skilltype: ['', Validators.required],
      managerid: ['', Validators.required],
      joindate: ['', Validators.required],
      status: ['', Validators.required],
      bank: ['', Validators.required],
      branch: ['', Validators.required],
      ifsc: ['', [Validators.required, Validators.pattern('^[A-Z]{4}0[A-Z0-9]{6}$')]], // IFSC code validation
      accountno: ['', [Validators.required, Validators.pattern('^[0-9]{9,18}$')]], // 9-18 digit bank account number
      password: ['', Validators.required],
    });
  }

  ngOnInit() {
    setTimeout(() => { 
      // console.log('User:', this.user);
      
      if(this.user) {
        this.userForm.patchValue(this.user);
      }else {
        console.error('User not found:', this.user);
      }
     }, 10); // Wait for the form to be initialized
  }


  // ✅ Update user
  // updateUser() {
    // console.log('User form:', this.userForm.value);
    // 
    // if (this.userForm.valid) {
      // alert('Please fill all the required fields');
      // this.commonService.updateUser(this.userForm.value).subscribe((response) => {
        // console.log('User updated:', response);
        // this.closeModal();
      // }, (error) => {
        // console.error('Error updating user:', error);
      // });
  // }
// }



updateUser() {
  if (!this.userForm.valid) {
    alert('Please fill all the required fields');
    return;
  }

  const updatedUser = {
    ...this.userForm.value,
    _id: this.user?._id // Ensure _id is included
  };

  this.commonService.updateUser(updatedUser).subscribe(
    (response) => {
      console.log('User updated:', response);
      this.userUpdated.emit(response);
      this.closeModal();
    },
    (error) => {
      console.error('Error updating user:', error);
    }
  );
}

  closeModal() {
    this.close.emit();
  }
}
