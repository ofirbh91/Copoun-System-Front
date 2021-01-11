import { Company } from 'app/models/Company';
import { Injectable } from '@angular/core';
import { AdminService } from './admin.service';

@Injectable({
  providedIn: 'root'
})
export class CompanyDataService {
companies:Company[];
origin:Company[];
  constructor(private adminService: AdminService) { }

public getAllCompanies(): Company[]{
  return this.companies;
}
public setCompanies(companies:Company[]):void{
  this.origin=companies;
  this.companies=companies;
}
public addCompany(company:Company):void{
  this.companies.push(company);
}
public deleteCompany(company:Company):void{
  this.companies=this.companies.filter(item=>item.id != company.id)
}
public deleteAllCompanies():void{
  this.companies = null;
}
public updateCompanies(): Company[]{
  this.adminService.getAllCompanies().subscribe(
    (companies)=>{this.companies=companies},
    (err)=>{err.error})
  return this.companies;
}
}