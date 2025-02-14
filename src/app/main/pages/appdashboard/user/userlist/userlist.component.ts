import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommonService } from '../../../../../services/common.service';
import { AddUsermodelComponent } from '../../../../ui/add-usermodel/add-usermodel.component';
import { DeleteuserComponent } from '../../../../ui/deleteuser/deleteuser.component';

@Component({
  selector: 'app-userlist',
  standalone: true,
  imports: [CommonModule, AddUsermodelComponent, DeleteuserComponent, FormsModule],
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

  constructor(private router: Router, private commonservice: CommonService) {}

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
  }
  openEditModal(user: any) {
    this.selectedUser = user;
    this.isEditModalOpen = true;
    this.isEditMode = true;
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
  
}
