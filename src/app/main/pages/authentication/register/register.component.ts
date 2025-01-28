import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  
  @Output() switchView = new EventEmitter<void>();

  // Emit an event to the parent to switch back to the login component
  onSwitchToLogin() {
    this.switchView.emit();
  }
  
}
