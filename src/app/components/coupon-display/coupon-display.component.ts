import { Company } from './../../models/Company';
import { element } from 'protractor';
import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category } from 'app/models/Category';
import { Coupon } from 'app/models/Coupon';
import { CompanyService } from 'app/services/company.service';
import { DataService } from 'app/services/data.service';
import { Customer } from 'app/models/Customer';

@Component({
  selector: 'app-coupon-display',
  templateUrl: './coupon-display.component.html',
  styleUrls: ['./coupon-display.component.css']
})
export class CouponDisplayComponent implements OnInit {
  coupons: Coupon[]
  public company = new Company();
  public customer = new Customer();
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dataService: DataService, private dialog: MatDialog) {
    this.company = data.company;
    this.customer = data.customer;
   
  }

  ngOnInit(): void {
    if (this.data.company) {
      this.coupons = this.company.coupons;
    } else {
      this.coupons = this.customer.coupons;
     
    }
  
   
    
  }
  public closeAll() {
    this.dialog.closeAll();
  }
}