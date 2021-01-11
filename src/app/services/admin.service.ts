import { TokenManagerService } from './token-manager.service';

import { Customer } from 'app/models/Customer';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Company } from 'app/models/Company';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  constructor(private httpClient: HttpClient,private tokenManagerService:TokenManagerService) { }
   url= "http://localhost:8080/admin/"
  public getAllCustomers():Observable<Customer[]>{
    const header = new HttpHeaders({ 'Authorization': this.tokenManagerService.getLoginResponse().token });
    const option ={ headers:header,withCredentials:false}
    return this.httpClient.get<Customer[]>(this.url+'get-customers',option)
  }
  public deleteCustomer(customer:Customer):Observable<any>{
    const header = new HttpHeaders({ 'Authorization': this.tokenManagerService.getLoginResponse().token });
    const option ={ headers:header,body: customer ,withCredentials:false}
    return this.httpClient.delete<any>(this.url+'delete-customer/'+customer.id,option)
  }
  public updateCustomer(customer:Customer):Observable<Customer>{
    const header = new HttpHeaders({ 'Authorization': this.tokenManagerService.getLoginResponse().token });
    const option ={ headers:header,body: customer ,withCredentials:false}
    return this.httpClient.put(this.url+'update-customer',customer,option);
  } 
  public addCustomer(customer:Customer):Observable<Customer>{
    const header = new HttpHeaders({ 'Authorization': this.tokenManagerService.getLoginResponse().token });
    const option ={ headers:header,body: customer ,withCredentials:false}
    return this.httpClient.post(this.url+'add-customer',customer,option)
  }
  public getAllCompanies():Observable<Company[]>{
    const header = new HttpHeaders({ 'Authorization': this.tokenManagerService.getLoginResponse().token });
    const option ={ headers:header,withCredentials:false}
    return this.httpClient.get<Company[]>(this.url+'get-companys',option)
  }
  public deleteCompany(company:Company):Observable<any>{
    const header = new HttpHeaders({ 'Authorization': this.tokenManagerService.getLoginResponse().token });
    const option ={headers:header,body: company ,withCredentials:false}
    return this.httpClient.delete<any>(this.url+'delete-company/'+company.id,option)
  }
  public updateCompany(company:Company):Observable<Company>{
    const header = new HttpHeaders({ 'Authorization': this.tokenManagerService.getLoginResponse().token });
    const option ={ headers:header,body: company ,withCredentials:false}
    return this.httpClient.put(this.url+'update-company',company,option);
  } 
  public addCompany(company:Company):Observable<Company>{
    const header = new HttpHeaders({ 'Authorization': this.tokenManagerService.getLoginResponse().token });
    const option ={ headers:header,body: company ,withCredentials:false}
    return this.httpClient.post(this.url+'add-company',company,option)
  }
  public getOneCompany(id: number):Observable<Company>{
    const header = new HttpHeaders({ 'Authorization': this.tokenManagerService.getLoginResponse().token });
    const option ={ headers:header,withCredentials:false}
    return this.httpClient.get<Company>(this.url+'get-company/'+id,option)
  }
  public getOneCustomer(id:number):Observable<Customer>{
    const header = new HttpHeaders({ 'Authorization': this.tokenManagerService.getLoginResponse().token });
    const option ={headers:header,withCredentials:false}
    return this.httpClient.get<Customer>(this.url+'get-customer/'+id,option);
  }

}