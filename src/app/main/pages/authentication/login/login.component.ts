import { CommonModule, JsonPipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, Router, RouterOutlet } from '@angular/router';
import { response } from 'express';
import { CommonService } from '../../../../services/common.service';
import { UserService } from '../../../../services/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, JsonPipe, 
    ReactiveFormsModule, RouterLink, RouterOutlet],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
  
})
export class LoginComponent {

  loginForm!:FormGroup;


  isSubmitted = false;

  data:any;

  // logincomponent constructor
  constructor(
    private fb: FormBuilder, 
    private router: Router, 
    private commonservice: CommonService,
    private userService: UserService,
  ) {}


  // On init
  ngOnInit():void{
    this.loginForm = this.fb.group({
      userid: ['', [
        Validators.required,
        // Validators.email,
        // Validators.pattern('[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}')
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(4)
      ]]
      // isAgree: [false]
    });
 
  }

  //  ***********************************************************************************
  //  login functionality
  //  ***********************************************************************************


  login(){
    this.isSubmitted=true;
    this.signin();
  }



  signin() {
    let obj = JSON.parse(JSON.stringify(this.loginForm.value));
    // console.log(obj);


    this.userService.signin(obj).subscribe(response => {
        // console.log(response);

        this.router.navigate(['/appdashboard']);
    })
  }


//  ***********************************************************************************
//  Redirect to Register Pages
//  ***********************************************************************************

  gotoRegister(){
    this.router.navigate(['/register']);
  }

}
