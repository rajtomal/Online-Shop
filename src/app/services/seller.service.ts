import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { SignUp, logIn } from '../data-type';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SellerService {
  loader = new BehaviorSubject<boolean>(false)

  isSellerLoggedIn = new BehaviorSubject<boolean>(false);
  isLogInError = new EventEmitter<boolean>(false)

  constructor(private http: HttpClient, private router: Router) { }



  //post sign up data
  sellerSignUp(data: SignUp) {
    this.http.post('https://online-shop-abay.onrender.com/seller', data, { observe: 'response' }).subscribe((result) => {
      // Behavior true
      this.isSellerLoggedIn.next(true);
      // localStorage Save Data
      localStorage.setItem('seller', JSON.stringify(result.body));
      // path defined
      this.router.navigate(['seller-home']);
    });
  }
  sellerLogIn(data: logIn) {
    this.http.post('https://online-shop-abay.onrender.com/login', data, { observe: 'response' }).subscribe(() => {

    })
  }
  
  reloadSeller() { 
    if (localStorage.getItem('seller')) {
      this.isSellerLoggedIn.next(true);
      this.router.navigate(['seller-home']);
    }
  }
  // login data

  sellerlogIn(data: logIn) {
    // console.log(data)
    this.http.get(`https://online-shop-abay.onrender.com/seller?email=${data.email}&password=${data.password}`, { observe: 'response' }).subscribe((result: any) => {
      if (result && result.body && result.body.length) {
        localStorage.setItem('seller', JSON.stringify(result.body[0]));
        // path defined
        this.router.navigate(['seller-home']);
        console.log(" log In sucess")
      } else {
        console.log("log In Fail")
        this.isLogInError.emit(true)
      }
    })
  }
 
}
