import { ShowDetailsComponent } from './../show-details/show-details.component';

import { CouponDialogComponent } from './../../dialogComponents/coupon-dialog/coupon-dialog.component';

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Coupon } from 'app/models/Coupon';
import { CompanyService } from 'app/services/company.service';
import { Category } from 'app/models/Category';
import { DataService } from 'app/services/data.service';
import { FiltersService } from 'app/services/filters.service';
import { MatInputModule } from '@angular/material/input';
import { Company } from 'app/models/Company';
import { AlertComponent } from '../alert/alert.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActionAlertComponent } from '../action-alert/action-alert.component';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {
  value = 'Clear me';
  constructor(public _modalService: NgbModal ,private companyService: CompanyService, private dialog: MatDialog, private dataService: DataService, private filterService: FiltersService) { }
  price: number
  coupon: Coupon
  coupons: Coupon[];
  comp: Company
  ngOnInit(): void {
      this.companyService.getAllCoupons().subscribe(
      (coupons) => { this.dataService.setCoupons(coupons), this.filterService.uploadData(coupons) },
      (err) => { alert(err.error) })
      this.companyService.getCompanyDetails().subscribe(
        (res)=>{this.comp = res}, 
        (err)=>{alert(err.error) })
        
    }
   
  public update(coupon: Coupon) {
    this.dialog.open(CouponDialogComponent, { data: { coupon }, height: '100%',
    width: '20%',
    autoFocus: false, });
  }
  public delete(coupon: Coupon): void {
    
      const result =  this._modalService.open(ActionAlertComponent);
      result.componentInstance.titlee = "delete " + coupon.title;
      result.componentInstance.message = 'Are you sure you want to delete ' +  coupon.title;
      result.result.then((result) => {
        this.companyService.deleteCoupon(coupon).subscribe(
          (res) => { this.dataService.deleteCoupon(res),this.filterService.uploadData(res); let message=coupon.title+ " has been deleted!"; this.dialog.open(AlertComponent,{data:{message}})},
          (err) => { err.message });
      }).catch(()=>{})
  }
  public getByCategory(category: Category): void {
    this.filterService.filterByCategory(category);
    
  }
  public getByPrice(price: number): void{
    if (price==0) {
      this.filterService.resetCoupons();
    } else {
      this.filterService.filterByPrice(price);  
    }
    
    
  }
  public addCoupon() {
    this.dialog.open(CouponDialogComponent, { data: {} ,  height: '100%',
    width: '40%',
    autoFocus: false})
  }
  public getOneCoupon(id:number):void{
    this.companyService.getOneCoupon(id).subscribe(
      (res)=>{this.dataService.setCoupons(res), this.filterService.uploadData(res)}, 
      (err)=>{err.message})
  }
  public getCoupons(): Coupon[]{
    return this.filterService.coupons
  }
  public showDetails(company: Company){
    company = this.comp
    this.dialog.open(ShowDetailsComponent,{ data: {company}})
  }
}
