import { AlertComponent } from './../../components/alert/alert.component';
import { CompanyFiltersService } from './../../services/company-filters.service';
import { Router } from '@angular/router';
import { CompanyDataService } from './../../services/company-data.service';
import { Component, OnInit ,Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Company } from 'app/models/Company';
import { AdminService } from 'app/services/admin.service';

@Component({
  selector: 'app-company-dialog',
  templateUrl: './company-dialog.component.html',
  styleUrls: ['./company-dialog.component.css']
})
export class CompanyDialogComponent implements OnInit {
  focus;
  focus1;
  
    constructor(@Inject(MAT_DIALOG_DATA)public data : any, private companyDataService:CompanyDataService,private dialog:MatDialog,private adminService:AdminService,private companyFiltersService: CompanyFiltersService, private router:Router) {
      this.company=data.company;
     }
     public company=new Company();
     public comp = new Company();
    ngOnInit(): void {
    }
    public updateCompany(){
      let message:string;
      this.adminService.updateCompany(this.company).subscribe(
        (res)=>{this.dialog.closeAll(); message= this.company.name+" has been updated!"; this.dialog.open(AlertComponent,{data:{message}})},
        (err)=>{message=err.error; this.dialog.open(AlertComponent,{data:{message}})})
        
    }
    public addCompany(){
      let message:string;
      this.adminService.addCompany(this.comp).subscribe(
        (company)=>{this.companyDataService.addCompany(company);
           this.companyDataService.updateCompanies();this.dialog.closeAll(); message=this.comp.name+" has been added!"; this.dialog.open(AlertComponent,{data:{message}})},
        (err)=>{message=err.error; this.dialog.open(AlertComponent,{data:{message}})})
        
    }
}