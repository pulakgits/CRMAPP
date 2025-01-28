import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './main/pages/authentication/login/login.component';
import { RegisterComponent } from './main/pages/authentication/register/register.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,LoginComponent, RegisterComponent,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'CRMAPP';

  showLogin = true; // Start by showing the login component

  toggleView() {
    this.showLogin = !this.showLogin; // Toggle between login and register components
  }
}
