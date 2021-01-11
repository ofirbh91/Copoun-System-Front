import { Coupon } from 'app/models/Coupon';
import { Component, Inject, OnInit } from '@angular/core';
import { CompanyService } from 'app/services/company.service';
import { Company } from 'app/models/Company';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Customer } from 'app/models/Customer';
import { CouponDisplayComponent } from '../coupon-display/coupon-display.component';

@Component({
  selector: 'app-show-details',
  templateUrl: './show-details.component.html',
  styleUrls: ['./show-details.component.css']
})
export class ShowDetailsComponent implements OnInit {

  constructor(private companyService: CompanyService, @Inject(MAT_DIALOG_DATA) public data: any, private dialog: MatDialog) { }
  public coup = new Coupon();
  public comp = new Company();
  public cust = new Customer();
  
  ngOnInit(): void {
    this.comp = this.data.company
    this.cust = this.data.customer
  }
  showCustomerCoupons(){
    let customer = new Customer();
    customer = this.cust
    this.dialog.open(CouponDisplayComponent,{data:{customer}});
  }
  showCompanyCoupons(){
    let company = new Company();
    company = this.comp
    this.dialog.open(CouponDisplayComponent,{data:{company}});
  }
  
}
