import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonService } from './common.service';
import { catchError, map, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = '';
authorization = '';
  

  constructor(public http: HttpClient,private commonService:CommonService) {
    this.baseUrl = this.commonService.getBaseUrl();
    this.authorization = this.commonService.getAuthorization();
   }


  signin(user: any) { 
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.authorization
      })  
    };
    return this.http.post(this.baseUrl +" ", user, httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandler) 
    )
    .pipe(
      catchError(this.errorHandler)
    )
  }


  errorHandler(error: any) {
    console.log(error);
    let message = (error['error']) ? ((error['error'].error) ? error['error'].error : error['message']) : error['message'];
    console.log(message);
    return throwError(() => message || 'Remote server unreachable. Please check your Internet connection.');
  }
}
