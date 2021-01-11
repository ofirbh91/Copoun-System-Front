import { Coupon } from './../models/Coupon';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from 'app/models/Customer';
import { TokenManagerService } from './token-manager.service';


@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  

  constructor(private httpClient: HttpClient, private tokenManagerService: TokenManagerService) { }

 
  public purchaseCoupon(coupon: Coupon): Observable<Coupon>{
    const header = new HttpHeaders({ 'Authorization': this.tokenManagerService.getLoginResponse().token });
    const option ={ headers:header,withCredentials:false}
    return this.httpClient.post('http://localhost:8080/customer/purchase-coupon', coupon, option)
  }
  public getCouponShop():Observable<Coupon[]>{
    const header = new HttpHeaders({ 'Authorization': this.tokenManagerService.getLoginResponse().token });
    const option ={ headers:header,withCredentials:false}
    return this.httpClient.get<Coupon[]>('http://localhost:8080/customer/get-all-coupons', option);
  }
  public getCustomerDetails(): Observable<Customer>{
    const header = new HttpHeaders({ 'Authorization': this.tokenManagerService.getLoginResponse().token });
    const option ={ headers:header,withCredentials:false}
    return this.httpClient.get<Customer>('http://localhost:8080/customer/get-customer-details', option)
  }

}


