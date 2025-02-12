import { AbstractControl, ValidationErrors } from '@angular/forms';



export class CustomValidators {
    static userInputValidator(control: AbstractControl): ValidationErrors | null {
        const value = control.value;
    
        // Email Pattern (Allows `+` like `apulak330+100@gmail.com`)
        const emailPattern = /^[a-zA-Z0-9._%+-]+(\+\d+)?@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
        // Mobile Number Pattern (10 digits, starts with 6-9 for Indian format)
        const mobilePattern = /^[6-9]\d{9}$/;
    
        // Username Pattern (Alphanumeric, 3-20 chars)
        const usernamePattern = /^[a-zA-Z0-9]{3,20}$/;
    
        if (emailPattern.test(value) || mobilePattern.test(value) || usernamePattern.test(value)) {
          return null; // Valid input
        } else {
          return { invalidUserInput: true }; // Invalid input
        }
    }    
}