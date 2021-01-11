import { Injectable } from '@angular/core';
import { Coupon } from 'app/models/Coupon';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  coupons: Coupon[];
  origin: Coupon[];
  constructor() { }

  public getAllCoupons(): Coupon[]{
    return this.coupons;
  }
  public setCoupons(coupons: Coupon[]): void{
    this.origin= coupons;
    this.coupons = coupons;
  }
  public addCoupons(coupon: Coupon): void{
    this.coupons.push(coupon);
  }
  public deleteCoupon(coupon: Coupon): void{
    this.coupons = this.coupons.filter(item=>item.id != coupon.id);
  }
  
  public deleteAllCoupons(): Coupon[]{
    
    return this.coupons 
  }
}
