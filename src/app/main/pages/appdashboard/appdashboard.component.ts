import { Component, NgModule, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule } from '@angular/forms';
import { UserComponent } from './user/user.component';
import { CommonService } from '../../../services/common.service';


@Component({
  selector: 'app-appdashboard',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule, FormsModule, UserComponent],
  templateUrl: './appdashboard.component.html',
  styleUrl: './appdashboard.component.css'
})

export class AppdashboardComponent {
  isDropdownOpen = false;


  constructor(private router: Router) {}


  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }



  

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
