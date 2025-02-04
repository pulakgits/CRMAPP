import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class CommonService {

  // private json url
  private jsonUrl = 'assets/jsons';
  private apiUrl = 'https://erp.sisx.in/vcrmapidev/api';//Dev API
  private authorization = 'Bearer c29mdG1lZXRzdmVuZG9yQ1JNOkoxNzFUU2U1VA==';

  // common service constructor
  constructor(private http: HttpClient) {}


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
   
  /**
 * ***********************************************************************************
 * JSON Service Functions
 * ***********************************************************************************
 */

  getCountries(): Observable<any> {
    return this.http.get<any>(this.jsonUrl+'/country.json')
    .pipe(map(data => data.countries));
  }
}
