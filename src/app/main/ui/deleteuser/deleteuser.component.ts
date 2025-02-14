import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonService } from '../../../services/common.service';

@Component({
  selector: 'app-deleteuser',
  standalone: true,
  imports: [],
  templateUrl: './deleteuser.component.html',
  styleUrl: './deleteuser.component.css'
})
export class DeleteuserComponent {
  @Input() user: any; // Receive user data to delete
  @Output() close = new EventEmitter<void>(); // Emit when modal is closed
  @Output() userDeleted = new EventEmitter<string>(); // Emit user ID after deletion

  isDeleting = false; // Flag to indicate delete in progress

  constructor(private commonService: CommonService) {}

  // Delete user function
  confirmDelete() {
    if (!this.user || !this.user._id) {
      console.error('Invalid user data for deletion:', this.user);
      return;
    }

    this.isDeleting = true;

    this.commonService.deleteUser(this.user._id).subscribe({
      next: () => {
        this.userDeleted.emit(this.user._id); // Emit user ID to parent component
        this.close.emit(); // Close the modal
        this.isDeleting = false;
      },
      error: (err) => {
        console.error('Error deleting user:', err);
        alert('Failed to delete user.');
        this.isDeleting = false;
      }
    });
  }

  // Close the modal
  cancelDelete() {
    this.close.emit();
  }
}
