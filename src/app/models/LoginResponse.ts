import { UserType } from './../UserType';
export class LoginResponse{
    
constructor(public token?:string,public userType?:UserType){
}
}