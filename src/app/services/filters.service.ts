import { Customer } from './../models/Customer';
import { Injectable } from '@angular/core';
import { Category } from 'app/models/Category';
import { Company } from 'app/models/Company';
import { Coupon } from 'app/models/Coupon';

@Injectable({
  providedIn: 'root'
})
export class FiltersService {
  coupons: Coupon[];
  origin: Coupon[];


  constructor() { }

  public uploadData(coupons: Coupon[]): void {
    this.coupons = coupons;
    this.origin = coupons;
  }
  public filterByCategory(category: Category): void {
    this.resetCoupons();
    this.coupons = this.coupons.filter(item => item.category == category);
  }

  public filterByPrice(price: number): void {
    this.resetCoupons();
    this.coupons = this.coupons.filter(item => item.price <= price);
  }

  public setCoupons(coupons: Coupon[]): void {
    this.coupons = coupons;
  }
  public getCoupons(): Coupon[] {
    return this.coupons
  }
  public deleteCoupon(coup: Coupon): void {
    this.coupons = this.coupons.filter(item=>item.id !== coup.id);
  }
  public resetCoupons(): void {
    this.coupons = this.origin;
  }
  public deleteCoupons(){
    this.coupons = null;
  }

}