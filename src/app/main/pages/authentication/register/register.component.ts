import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { CommonService } from '../../../../services/common.service';
import { Router } from '@angular/router';

export interface Country {
  country: string;
  iso_code: string;
  states: State[];
}

export interface State {
  name: string;
  code: string;
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  regForm: FormGroup;

  countries: Country[] = [];  // Holds country data
  states: State[] = [];  // Holds state data
  
 
  constructor(private fb: FormBuilder,private commonservice: CommonService, private router: Router) {
    
    this.regForm = this.fb.group({
      vendorName: ['', Validators.required],
      address: ['', Validators.required],
      country: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      pincode: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]],
      mobile: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  // angular onInit lifecycle
  ngOnInit(): void {
    this.showAll();
  }


  onCountryChange() {
    const countryCode = this.regForm.get('country')?.value;
    const selectedCountry = this.countries.find(c => c.iso_code === countryCode);
    this.states = selectedCountry ? selectedCountry.states : [];
    
    // Reset state value when country changes
    this.regForm.get('state')?.reset('');
  }


  onSubmit() {
    if (this.regForm.valid) {
      console.log(this.regForm.value); // Handle form submission
    } else {
      console.log('Form is invalid!');
    }
  }

  showAll() {
    this.commonservice.getCountries().subscribe({
      next: (countries) => {
        this.countries = countries;
      },
      error: (err) => console.error('Error loading countries:', err)
    });
  }              


  //  ***********************************************************************************
  //  Redirect to Login Pages
  //  ***********************************************************************************

gotoLogin(){
  this.router.navigate(['/login']);
}





}
