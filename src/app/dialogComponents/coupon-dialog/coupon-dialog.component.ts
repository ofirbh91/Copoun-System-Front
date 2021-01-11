import { CompanyService } from './../../services/company.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Coupon } from 'app/models/Coupon';
import { DataService } from 'app/services/data.service';
import { AlertComponent } from 'app/components/alert/alert.component';

@Component({
  selector: 'app-coupon-dialog',
  templateUrl: './coupon-dialog.component.html',
  styleUrls: ['./coupon-dialog.component.css']
})
export class CouponDialogComponent implements OnInit {
  focus;
  focus1;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private companyService: CompanyService, private dialog: MatDialog, private dataService: DataService) {
    this.coupon = data.coupon
   }
   public coup = new Coupon();
  public coupon = new Coupon();
  ngOnInit(): void {
  }
  public updateCoupon(){
    let message:string;
  this.companyService.updateCoupon(this.coupon).subscribe(
  (res)=>{this.dialog.closeAll(); message=this.coupon.title+" has been updated!"; this.dialog.open(AlertComponent,{data:{message}}) }, 
  (err)=>{message=err.error; this.dialog.open(AlertComponent,{data:{message}})})
  this.dialog.closeAll()
  }

  public addCoupon(){
    let message:string;
    this.companyService.addCoupon(this.coup).subscribe(
      (coupon)=>{this.dataService.addCoupons(coupon);this.dialog.closeAll();message=this.coup.title+" has been added!"; this.dialog.open(AlertComponent,{data:{message}})}, 
      (err)=>{message=err.error; this.dialog.open(AlertComponent,{data:{message}})})

  }
}
