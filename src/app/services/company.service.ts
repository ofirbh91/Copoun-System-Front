import { Company } from 'app/models/Company';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from 'app/models/Category';
import { Coupon } from 'app/models/Coupon';
import { Observable } from 'rxjs';
import { TokenManagerService } from './token-manager.service';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private httpClient: HttpClient, private tokenManagerService: TokenManagerService) { }


  public getAllCoupons(): Observable<Coupon[]> {
    const header = new HttpHeaders({ 'Authorization': this.tokenManagerService.getLoginResponse().token });
    const option = { headers : header, withCredentials: false };
    return this.httpClient.get<Coupon[]>('http://localhost:8080/company/get-coupons', option);
  }

  public updateCoupon(coupon: Coupon): Observable<Coupon> {
    const header = new HttpHeaders({ 'Authorization': this.tokenManagerService.getLoginResponse().token });
    const option = { headers: header, withCredentials: false };
    return this.httpClient.put('http://localhost:8080/company/update-coupon',coupon, option);
  }
  public deleteCoupon(coupon: Coupon): Observable<any> {
    const header = new HttpHeaders({ 'Authorization': this.tokenManagerService.getLoginResponse().token });
    const option = { headers: header, withCredentials: true };

    return this.httpClient.delete<any>('http://localhost:8080/company/delete-coupon/' + coupon.id, option)
  }
  public getByCategory(category: Category): Observable<Coupon[]> {
    const header = new HttpHeaders({ 'Authorization': this.tokenManagerService.getLoginResponse().token });
    const option = {headers: header, withCredentials:false};
    const category1 = category
    return this.httpClient.get<Coupon[]>('http://localhost:8080/company/get-coupon/{category}?category=' + category1, option)
  }
  public getByPrice(price: number): Observable<Coupon[]> {
    const header = new HttpHeaders({ 'Authorization': this.tokenManagerService.getLoginResponse().token });
    const option = {headers: header, withCredentials:false};
    return this.httpClient.get<Coupon[]>('http://localhost:8080/company/get-coupon/{price}?price=' + price, option)
  }
  public addCoupon(coupon: Coupon): Observable<Coupon> {
    const header = new HttpHeaders({ 'Authorization': this.tokenManagerService.getLoginResponse().token });
    const option = {headers: header, withCredentials:false};
    return this.httpClient.post('http://localhost:8080/company/add-coupon',coupon, option)
  }
  public getOneCoupon(id: number): Observable<Coupon[]> {
    const header = new HttpHeaders({ 'Authorization': this.tokenManagerService.getLoginResponse().token });
    const option = {headers: header, withCredentials:false};
    return this.httpClient.get<Coupon[]>('http://localhost:8080/company/get-coupon/{id}?id=' + `${id}`, option);
  }
  public getCompanyDetails(): Observable<Company> {
    const header = new HttpHeaders({ 'Authorization': this.tokenManagerService.getLoginResponse().token });
    const option = {headers: header, withCredentials:false};
    return this.httpClient.get<Company>('http://localhost:8080/company/company-details', option)
  }
}
