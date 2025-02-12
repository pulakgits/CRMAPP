import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { UserComponent } from '../user.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CommonService } from '../../../../../services/common.service';
import { AddUsermodelComponent } from '../../../../ui/add-usermodel/add-usermodel.component';
import { EditUserModelComponent } from '../../../../ui/edit-user-model/edit-user-model.component';
import { log } from 'node:console';

@Component({
  selector: 'app-userlist',
  standalone: true,
  imports: [CommonModule, AddUsermodelComponent,EditUserModelComponent],  // ✅ Required for *ngFor and *ngIf
  templateUrl: './userlist.component.html',
  styleUrl: './userlist.component.css'
})
export class UserlistComponent implements OnInit {
  users: any[] = [];

  isModalOpen = false;

  isEditModalOpen = false;

  selectedUser: any ;

  newUser = {
    _id: '',
    employeeid: '',
    firstname: '',
    lastname: '',
    email: '',
    mobile: '',
    bloodgroup: '',
  };

  constructor(private router: Router, private commonservice: CommonService) {}
    ngOnInit() {
      this.loadUsers();
    }

  // Load user from the backend
  loadUsers() {
    this.commonservice.searchUsers({})
      .subscribe({
        next: (response) => {
          console.log('API Response:', response);  
          // Handle different response structures
          if (response && Array.isArray(response.users)) {
            this.users = response.users || [];
          } else if (response && Array.isArray(response)) {
            this.users = response; // Sometimes API may return an array directly
          } else {
            console.warn('Unexpected API response format:', response);
            this.users = [];
          }
          console.log('Processed Users:', this.users);
        },
        error: (error) => {
          console.error('API Error:', error);
        }
      });
  }

  // when click on add user button
  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }  


  // Edit model open and closed method
  openEditModal(user: any) {
    console.log('Edit user:', user);
    this.selectedUser= user;
    this.isEditModalOpen = true;
  }

  closeEditModal(){
    this.isEditModalOpen = false;
  }


  // when click on add user button
  addUser(user: any) {
    // this.users.push(user); // ✅ Add new user to UI instantly
  
    // ✅ Reload user list from the backend (optional)
    this.loadUsers();
  }


  handleUserUpdate() {
  
    this.loadUsers(); // ✅ Reload user list from the backend (optional)
    this.closeModal(); // Close the modal after updating
  }
  


  // ✅ Handle confirmed delete

  // delete user
  deleteUser(userId: string, index: number) {
    if (!confirm('Are you sure you want to delete this user?')) return;

    this.commonservice.deleteUser(userId).subscribe({
      next: (response) => {
        console.log(`User ${userId} deleted successfully`, response);
        this.users.splice(index, 1);  // ✅ Remove from UI after success
      },
      error: (err) => {
        console.error('Failed to delete user:', err);
        alert('Failed to delete user. Please try again.');
      }
    });
  }
} 