  import { HttpClient, HttpHeaders } from '@angular/common/http';
  import { Inject, Injectable } from '@angular/core';
  import { response } from 'express';
  import { from, map, Observable, Subject } from 'rxjs';


  @Injectable({
    providedIn: 'root'
  })


  export class CommonService {


    // private json url
    private jsonUrl = 'assets/jsons';
    private apiUrl = 'https://erp.sisx.in/vcrmapidev/api';//Dev API
    private authorization = 'Bearer c29mdG1lZXRzdmVuZG9yQ1JNOkoxNzFUU2U1VA==';

    constructor(
      private http: HttpClient
    ) {}

    private getHeaders() {
      return new HttpHeaders({
        Authorization: this.authorization,
        'Content-Type': 'application/json',
      });
    }

    /**
   * ***********************************************************************************
   * API URL Functions
   * ***********************************************************************************
   */

    getAuthorization() {
      return this.authorization;
    }

    getBaseUrl() {
      return this.apiUrl;
    }



    // ✅ Create User API Call
    addUser(user: any): Observable<any> {
      return this.http.post(`${this.apiUrl}/user/create`, user, { headers: this.getHeaders() });
    } 
    login(userId: string, password: string): Observable<any> {
      return this.http.post(`${this.apiUrl}/user/signin`, { mobile: userId, password }, { headers:  this.getHeaders() });
    }
    
    searchUsers(criteria: any): Observable<any> {
      return this.http.post(`${this.apiUrl}/user/search`, criteria, { headers: this.getHeaders() });
    }
    
    deleteUser(userId: string): Observable<any> {
      const body = { _id: userId };  // ✅ Send _id in the body
      return this.http.post(`${this.apiUrl}/user/delete`, body, { headers: this.getHeaders() });
    }
    
    // update user api call
    updateUser(user: any): Observable<any> {
      return this.http.post(`${this.apiUrl}/user/update`, user, { headers: this.getHeaders() });
    }


    
    /**
   * ***********************************************************************************
   * JSON Service Functions
   * ***********************************************************************************
   */

    getCountries(): Observable<any> {
      return this.http.get<any>(this.jsonUrl+'/country.json')
      .pipe(map(data => data.countries));
    }

    getFeatures():any {
      return this.http.get(this.jsonUrl + '/features/json')
      .pipe(map((response:any) => response))
    }
  }

