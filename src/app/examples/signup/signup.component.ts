import { MatDialog } from '@angular/material/dialog';
import { TokenManagerService } from './../../services/token-manager.service';
import { LoginResponse } from './../../models/LoginResponse';
import { LoginService } from './../../services/login.service';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UserType } from 'app/UserType';
import { AlertComponent } from 'app/components/alert/alert.component';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
    test : Date = new Date();
    focus;
    focus1;
   
   
    userType: string;
userType1: UserType;
loginResponse: LoginResponse;

    constructor(private dialog: MatDialog,private activatedRoute: ActivatedRoute, private route: Router,private loginService:LoginService, private tokenManagerService:TokenManagerService) { }

    ngOnInit() {
       this.activatedRoute.paramMap.subscribe(params=>{this.userType = params.get("UserType")})
       if(this.userType ==='admin'){
           this.userType1 = UserType.admin
        }else if(this.userType ==='company'){
            this.userType1 = UserType.company
        }else if(this.userType ==='customer'){
            this.userType1 = UserType.customer
    }
console.log(this.userType1);

    }
    login(email: string, password: string, userType: string):void{
        let message:string;
        if ( userType =='admin') {
          this.loginService.adminLogin(email, password).subscribe(
              (res)=>{this.route.navigate(['/admin']),this.loginResponse=res;this.loginResponse.userType=this.userType1;this.tokenManagerService.setLoginResponse(this.loginResponse)}, 
              (err)=>{message=err.error; this.dialog.open(AlertComponent,{data:{message}})})};
        if(userType =='company') {
          this.loginService.companyLogin(email, password).subscribe(
              (res)=>{this.route.navigate(['/company']),this.loginResponse=res;this.loginResponse.userType=this.userType1;this.tokenManagerService.setLoginResponse(this.loginResponse)},
              (err)=>{message=err.error; this.dialog.open(AlertComponent,{data:{message}})})};
        if(userType =='customer'){
          this.loginService.customerLogin(email, password).subscribe(
              (res)=>{this.route.navigate(['/customer']),this.loginResponse=res;this.loginResponse.userType=this.userType1;this.tokenManagerService.setLoginResponse(this.loginResponse)}, 
              (err)=>{message=err.error; this.dialog.open(AlertComponent,{data:{message}})})};
      }
}