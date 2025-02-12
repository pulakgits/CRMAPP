import { CommonModule, JsonPipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { FormBuilder, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, Router, RouterOutlet } from '@angular/router';
import { response } from 'express';
import { CommonService } from '../../../../services/common.service';
import { UserService } from '../../../../services/user.service';
import { log } from 'console';
import { CustomValidators } from '../usable class/CustomValidators';

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

  private _unscribeAll: Subject<any> = new Subject();
  errorMessage: string = '';

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
        CustomValidators.userInputValidator
        
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
    this.commonservice.login(this.loginForm.value.userid, this.loginForm.value.password)
    .subscribe((response: any) => {
      console.log(response);
      let currentUser = JSON.parse(JSON.stringify(response));
      this.router.navigate(['/appdashboard']);
      console.log("currentUser", currentUser);
      
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    },
      (error: any) => {
        this.errorMessage = 'Invalid credentials';
      }
    );    
  }



//  ***********************************************************************************
//  Redirect to Register Pages
//  ***********************************************************************************

  gotoRegister(){
    this.router.navigate(['/register']);
  }

}
