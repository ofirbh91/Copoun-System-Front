import { CustomerDataService } from 'app/services/customer-data.service';
import { CompanyDataService } from './../../services/company-data.service';
import { ActionAlertComponent } from './../../components/action-alert/action-alert.component';
import { CompanyComponent } from './../../components/company/company.component';

import { Component, OnInit, ElementRef } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { DataService } from 'app/services/data.service';
import { Router } from '@angular/router';
import { CompanyService } from 'app/services/company.service';
import { Company } from 'app/models/Company';
import { TokenManagerService } from 'app/services/token-manager.service';
import { MatDialog } from '@angular/material/dialog';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FiltersService } from 'app/services/filters.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
    private toggleButton: any;
    private sidebarVisible: boolean;

   
    
    constructor(private companyData: CompanyDataService,private customerData: CustomerDataService ,private filter: FiltersService,public _modalService: NgbModal , public dialog: MatDialog, public location: Location, private element : ElementRef, private dataService: DataService, private router: Router, private token: TokenManagerService) {
        this.sidebarVisible = false;
    }
    company: Company;

    ngOnInit() {
        const navbar: HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
    }
    sidebarOpen() {
        const toggleButton = this.toggleButton;
        const html = document.getElementsByTagName('html')[0];
        // console.log(html);
        // console.log(toggleButton, 'toggle');

        setTimeout(function(){
            toggleButton.classList.add('toggled');
        }, 500);
        html.classList.add('nav-open');

        this.sidebarVisible = true;
    };
    sidebarClose() {
        const html = document.getElementsByTagName('html')[0];
        // console.log(html);
        this.toggleButton.classList.remove('toggled');
        this.sidebarVisible = false;
        html.classList.remove('nav-open');
    };
    sidebarToggle() {
        // const toggleButton = this.toggleButton;
        // const body = document.getElementsByTagName('body')[0];
        if (this.sidebarVisible === false) {
            this.sidebarOpen();
        } else {
            this.sidebarClose();
        }
    };
    isHome() {
      var titlee = this.location.prepareExternalUrl(this.location.path());
      if(titlee.charAt(0) === '#'){
          titlee = titlee.slice( 1 );
      }
        if( titlee === '/home' ) {
            return true;
        }
        else {
            return false;
        }
    }
    isDocumentation() {
      var titlee = this.location.prepareExternalUrl(this.location.path());
      if(titlee.charAt(0) === '#'){
          titlee = titlee.slice( 1 );
      }
        if( titlee === '/documentation' ) {
            return true;
        }
        else {
            return false;
        }
    }
    isComponent(){
        var titlee = this.location.prepareExternalUrl(this.location.path());
        if(titlee.charAt(0) === '#'){
            titlee = titlee.slice( 1 );
        }
          if( titlee === '/customer' || titlee === '/company' || titlee === '/admin') {
              return true;
          }
          else {
              return false;
          }
    }
   
    logout(): void{
        const message = 'Are you sure you want to logout?'
        const result =  this._modalService.open(ActionAlertComponent);
        result.componentInstance.titlee = 'Logout'
        result.componentInstance.message = 'Are you sure you want to logout?'
        result.result.then((result) => {
            this.companyData.deleteAllCompanies();
            this.customerData.deleteAllCustomers();
            this.dataService.deleteAllCoupons();
            this.filter.deleteCoupons();
            this.token.deleteLoginResponse();
            this.router.navigate(['/home']);
        }).catch(()=>{})
      }
        
    }
   
    
