import { CompanyFiltersService } from './../../services/company-filters.service';
import { CustomerDialogComponent } from './../../dialogComponents/customer-dialog/customer-dialog.component';
import { CustomerDataService } from './../../services/customer-data.service';
import { CompanyDialogComponent } from './../../dialogComponents/company-dialog/company-dialog.component';
import { Company } from './../../models/Company';
import { AdminService } from './../../services/admin.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CouponDisplayComponent } from '../coupon-display/coupon-display.component';
import { Coupon } from 'app/models/Coupon';
import { CompanyDataService } from 'app/services/company-data.service';
import { Customer } from 'app/models/Customer';
import { CustomerFiltersService } from 'app/services/customer-filters.service';
import { AlertComponent } from '../alert/alert.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActionAlertComponent } from '../action-alert/action-alert.component';
import { ShowDetailsComponent } from '../show-details/show-details.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  value = 'Clear me';

  constructor(public _modalService: NgbModal ,private adminService: AdminService, private customerDataService: CustomerDataService, private dialog: MatDialog, private companyDataService: CompanyDataService, private companyFiltersService: CompanyFiltersService, private customerfiltersService: CustomerFiltersService) { }
  companies: Company[];
  company: Company;
  coupons: Coupon[];
  customer: Customer[];
  
  ngOnInit(): void {
    this.adminService.getAllCompanies().subscribe(
      (companies) => { this.companyDataService.setCompanies(companies) },
      (err) => { err.message })
    this.adminService.getAllCustomers().subscribe(
      (res) => { this.customerDataService.setCustomers(res); },
      (err) => { err.message })
  }
  public update(company: Company) {
    this.dialog.open(CompanyDialogComponent, { data: { company } })
  }
  public add() {
    this.dialog.open(CompanyDialogComponent, { data: {} })
  }
  public showCoupons(company: Company) {
    this.dialog.open(CouponDisplayComponent, { data: { company } })
  }
  public delete(company: Company): void {

    
      const result =  this._modalService.open(ActionAlertComponent);
      result.componentInstance.titlee = "delete " + company.name + "?";
      result.componentInstance.message = 'Are you sure you want to delete ' + company.name +' company?';
      result.result.then((result) => {
        this.adminService.deleteCompany(company).subscribe(
          (res) => { this.companyDataService.deleteCompany(company);let message=company.name+ " has been deleted!"; this.dialog.open(AlertComponent,{data:{message}})},
          (err) => { err.error});
      }).catch(()=>{})
    
    
  }
  public getCompanies(): Company[] {
    return this.companyDataService.getAllCompanies();
  }
  public getCustomers(): Customer[] {
    return this.customerDataService.getAllCustomers();
  }
  public deleteCustomer(customer: Customer): void {

      const result =  this._modalService.open(ActionAlertComponent);
      result.componentInstance.titlee = "delete " + customer.firstName;
      result.componentInstance.message = 'Are you sure you want to delete ' +  customer.firstName +" "+ customer.lastName;
      result.result.then((result) => {
        this.adminService.deleteCustomer(customer).subscribe(
          (res) => { this.customerDataService.deleteCustomer(customer);let message=customer.firstName+ " has been deleted!"; this.dialog.open(AlertComponent,{data:{message}})},
          (err) => { err.error});
      }).catch(()=>{})
    
  }
  public addCustomer() {
    this.dialog.open(CustomerDialogComponent,  { data: {} ,
    width: '20%',
    autoFocus: false})
  }
  public updateCustomer(customer: Customer) {
    this.dialog.open(CustomerDialogComponent, { data: { customer } })
  }
  public showCustomerCoupons(customer: Customer) {
    this.dialog.open(CouponDisplayComponent, { data: { customer } })
  }
  public getOneCompany(id: number){
    let company = new Company();
    this.adminService.getOneCompany(id).subscribe(
      (res)=>{company = res;  this.dialog.open(ShowDetailsComponent, { data: { company }})}, 
      (err)=>{})
 
  }
  public getOneCustomer(id: number){
    let customer = new Customer();
    this.adminService.getOneCustomer(id).subscribe(
      (res)=>{customer = res;  this.dialog.open(ShowDetailsComponent, { data: { customer }})}, 
      (err)=>{})
 
  }
}