import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertComponent } from 'app/components/alert/alert.component';
import { Customer } from 'app/models/Customer';
import { AdminService } from 'app/services/admin.service';
import { CustomerDataService } from 'app/services/customer-data.service';
import { FiltersService } from 'app/services/filters.service';

@Component({
  selector: 'app-customer-dialog',
  templateUrl: './customer-dialog.component.html',
  styleUrls: ['./customer-dialog.component.css']
})
export class CustomerDialogComponent implements OnInit {

  focus;
  focus1;
  
    constructor(@Inject(MAT_DIALOG_DATA)public data : any,private customerDataService:CustomerDataService,private dialog:MatDialog,private adminService:AdminService,private filterService:FiltersService) {
      this.customer=data.customer;
     }
     public customer=new Customer();
     public cust = new Customer();
    ngOnInit(): void {
    }
    public updateCustomer(){
      let message:string;
      this.adminService.updateCustomer(this.customer).subscribe(
        (res)=>{this.dialog.closeAll(); message=this.customer.firstName+" "+this.customer.lastName+" has been updated!"; this.dialog.open(AlertComponent,{data:{message}})},
        (err)=>{message=err.error; this.dialog.open(AlertComponent,{data:{message}})})
        this.dialog.closeAll();
    }
public addCustomer(){
  let message:string;
  this.adminService.addCustomer(this.cust).subscribe(
    (customer)=>{this.customerDataService.addCustomer(customer); this.customerDataService.updateData(); this.dialog.closeAll(); message=this.cust.firstName+" "+this.cust.lastName+" has been added!"; this.dialog.open(AlertComponent,{data:{message}})},
    (err)=>{message=err.error; this.dialog.open(AlertComponent,{data:{message}})})
   
}

}