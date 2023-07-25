import { Component } from '@angular/core';
import { SellerService } from '../services/seller.service';
import { Router } from '@angular/router';
import { SignUp, logIn } from '../data-type';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.scss']
})
export class SellerAuthComponent {

  showLogin = false;
  logInError: undefined | string;

  constructor(private seller:SellerService, private router: Router){};
  ngOnInit():void{
    this.seller.reloadSeller();
  }
  signUp(data:SignUp):void{
    // post data for seller service
    this.seller.sellerSignUp(data)
    // console.log(data,"seller data")
  }
  logIn(data:logIn):void{
    this.logInError='';
    // console.log(data)
    // post data for seller service 
    this.seller.sellerlogIn(data)
    this.seller.isLogInError.subscribe((isError)=>{
      if(isError){
        this.logInError ="Email & Password is not Correct"
        setTimeout(() => {
          this.logInError = undefined
        }, 3000);
      }
    })

  }
    // this.seller.userSignUp(data)
  
  loginPage(){
    this.showLogin = true;
  }
  signUpPage(){
    this.showLogin = false;
  }
}
