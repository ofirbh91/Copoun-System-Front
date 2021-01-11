import { Injectable } from '@angular/core';
import { Customer } from 'app/models/Customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerFiltersService {
  customers: Customer[];
  customerOrigin: Customer[];
  constructor() { }
  public customerUploadData(customers: Customer[]): void {
    this.customers = customers;
    this.customerOrigin = customers;
  }
  public setCustomers(customers: Customer[]): void {
    this.customers = customers;
  }
  public getCustomers(): Customer[] {
    return this.customers
  }
  public resetCustomers(): void {
    this.customers = this.customerOrigin;
  }
}
