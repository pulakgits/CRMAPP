import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonService } from '../../../../../services/common.service';
import { AddUsermodelComponent } from '../../../../ui/add-usermodel/add-usermodel.component';
import { DeleteuserComponent } from '../../../../ui/deleteuser/deleteuser.component';

@Component({
  selector: 'app-userlist',
  standalone: true,
  imports: [CommonModule, AddUsermodelComponent, DeleteuserComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './userlist.component.html',
  styleUrl: './userlist.component.css'
})
export class UserlistComponent implements OnInit {

  users: any[] = [];
  filteredUsers: any[] = [];
  searchTerm: string = '';

  isModalOpen = false;
  isEditModalOpen = false;
  isEditMode = false;
  isDeleteModalOpen = false;

  selectedUser: any;
  
  showAddUserForm: boolean = false;
  

  // Form group to handle user input fields
  userForm: FormGroup;
  isSaving = false; // Flag to indicate if form is in saving state

  // Injecting required services
private fb = inject(FormBuilder);
private commonService = inject(CommonService);
  

  constructor(private router: Router, private commonservice: CommonService) {
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
    this.loadUsers();
  }

  // ✅ Load users from backend
  loadUsers() {
    this.commonservice.searchUsers({})
      .subscribe({
        next: (response) => {
          console.log('API Response:', response);
          
          if (response && Array.isArray(response.users)) {
            this.users = response.users || [];
          } else if (response && Array.isArray(response)) {
            this.users = response;
          } else {
            console.warn('Unexpected API response format:', response);
            this.users = [];
          }

          this.filteredUsers = this.users; // ✅ Initialize the filtered list
          console.log('Processed Users:', this.users);
          console.log('Filtered Users:', this.filteredUsers);
        },
        error: (error) => {
          console.error('API Error:', error);
        }
      });
  }

  // ✅ Search Users by Name
  filterUsers() {
    const search = this.searchTerm.toLowerCase().trim();
    console.log('Search Term:', search);
    console.log('Users Before Filter:', this.users);

    this.filteredUsers = this.users.filter(user =>
      (`${user.firstname} ${user.lastname}`).toLowerCase().includes(search)
    );

    console.log('Filtered Users:', this.filteredUsers);
  }

  // ✅ Open & close modals
  openModal() {
    this.isModalOpen = true;
  }
  closeModal() {
    this.isModalOpen = false;
    this.isEditMode = false;
    this.userForm.reset();
  }
  openEditModal(user: any) {
    this.selectedUser = user;
    this.isEditModalOpen = true;
    this.isEditMode = true;
    this.isModalOpen = true;
    this.userForm.patchValue(user);
  }
  closeEditModal() {
    this.isEditMode = false;
    this.isEditModalOpen = false;
    this.selectedUser = null;
  }

  // ✅ Add user and refresh list
  addUser(user: any) {
    this.loadUsers();
  }

  handleUserUpdate() {
    this.loadUsers();
    this.closeModal();
  }

  // ✅ Update filtered list after editing user
  onUserUpdated(updatedUser: any) {
    const index = this.users.findIndex(user => user._id === updatedUser._id);
    if (index !== -1) {
      this.users[index] = updatedUser;
      this.filterUsers();
    }
  }

  // ✅ Handle delete user
  openDeleteModal(user: any) {
    this.selectedUser = user;
    this.isDeleteModalOpen = true;
  }
  closeDeleteModal() {
    this.isDeleteModalOpen = false;
    this.selectedUser = null;
  }
  deleteUser(deletedUserId: string) {
    this.users = this.users.filter(user => user._id !== deletedUserId);
    this.filterUsers();
    this.closeDeleteModal();
  }

  // Method to save a new user
saveUser() {
  // Prevent submission if the form is invalid
  if (this.userForm.invalid) return;
  this.isSaving = true;
  if(this.isEditMode) {
    // Update existing user
    this.updateUser();
  }else{
    // Indicate saving process has started
  
    this.commonservice.addUser(this.userForm.value).subscribe({
      next: (response) => {
        // this.userAdded.emit(response); // Emit event after successful save
        this.loadUsers(); // Refresh user list
        this.closeModal(); // Close modal
        this.isEditMode = false;
      },
      error: (err) => {
        console.error('Error saving user:', err);
        alert('Failed to save user.');
        this.isEditMode = false;
      }
    });
  }
  
}


 // Method to update an existing user
 updateUser() {
  if (!this.userForm.valid) {
    alert('Please fill all the required fields');
    return;
  }

  const updatedUser = {
    ...this.userForm.value,
    _id:this.selectedUser?._id
  };
  
  this.commonService.updateUser(updatedUser).subscribe(
    (response) => {
      console.log('User updated successfully:', response);
      this.loadUsers(); // Refresh user list
      this.closeModal(); // Close modal
      this.isSaving = false;
    },
    (error) => {
      console.error('Error updating user:', error);
    }
  );
}

//  Method to update an existing user
//  updateUser() {
  // if (!this.userForm.valid) {
    // alert('Please fill all the required fields');
    // return;
  // }
// 
  // const updatedUser = {
    // ...this.userForm.value,
    // _id: this.user?._id
  // };
  // 
  // this.commonService.updateUser(updatedUser).subscribe(
    // (response) => {
      // console.log('User updated successfully:', response);
      // this.userUpdate.emit(response); // Emit event to parent
      // this.closeModal(); // Close modal
    // },
    // (error) => {
      // console.error('Error updating user:', error);
    // }
  // );
// }
  
}
