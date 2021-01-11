import { UserType } from 'app/UserType';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient) {}

  public companyLogin(email: string, password: string): Observable<any>{
    return this.httpClient.post('http://localhost:8080/company/signup/'+email+"/"+password, UserType)
  }
  public customerLogin(email: string, password: string): Observable<any>{
    return this.httpClient.post('http://localhost:8080/customer/signup/'+email+"/"+password, UserType)
  }
  public adminLogin(email: string, password: string): Observable<any>{
    return this.httpClient.post('http://localhost:8080/admin/signup/'+email+"/"+password, UserType)
  }
}
