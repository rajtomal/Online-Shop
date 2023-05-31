import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { SignUp } from '../data-type';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SellerService {
  isSellerLoggedIn= new BehaviorSubject<boolean>(false)
  constructor(private http:HttpClient, private router:Router) { }



  //post sign up data
  userSignUp(data:SignUp){
    this.http.post('http://localhost:3000/seller', data,{observe:'response'}).subscribe((result)=>{
      // Behavior true
      this.isSellerLoggedIn.next(true);
      // localStorage Save Data
      localStorage.setItem('seller',JSON.stringify(result.body));
      // path defined
      this.router.navigate(['seller-home']);
    });
  }
  reloadSeller(){
    if(localStorage.getItem('seller')){
      this.isSellerLoggedIn.next(true);
      this.router.navigate(['seller-home']);
    }
  }
}
