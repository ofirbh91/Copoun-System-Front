import { LoginResponse } from './../models/LoginResponse';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenManagerService {

  constructor() {
    if(localStorage.getItem('token')){
      this.loginResponse.token=localStorage.getItem('token')
    }
   }

  loginResponse=new LoginResponse();

public setLoginResponse(loginResponse:LoginResponse):void{
  localStorage.setItem('token', loginResponse.token);
	this.loginResponse=loginResponse;
}
public deleteLoginResponse():void{
  localStorage.removeItem('token');
  this.loginResponse = null;
}
public getLoginResponse():LoginResponse{
	return this.loginResponse;
}

}