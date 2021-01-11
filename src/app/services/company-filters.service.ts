import { Injectable } from '@angular/core';
import { Company } from 'app/models/Company';

@Injectable({
  providedIn: 'root'
})
export class CompanyFiltersService {
  companies:Company[];
  origin:Company[];
  constructor() { }
  public companyUploadData(companies: Company[]): void{
    this.companies = companies;
    this.origin = companies;
  }
  public setCompanies(companies: Company[]): void{
    this.companies = companies;
  }
  public addCompany(company: Company): Company[]{
     this.companies.push(company)
     return this.companies
  }
  public getCompanies(): Company[]{
    return this.companies
  }
  public resetCompanies(): void{
    this.companies = this.origin;
  }
}
