import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SignUp, logIn } from '../data-type';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  loader = new BehaviorSubject<boolean>(false)

  isUserLoggedIn = new BehaviorSubject<boolean>(false);
  isLogInError = new EventEmitter<boolean>(false);


  constructor(private http: HttpClient, private route:Router) { }

  userSignUp(data: SignUp) {
    this.http.post(`https://online-shop-abay.onrender.com/userData`, data, { observe: 'response' }).subscribe((result) => {
      if(result){
        localStorage.setItem('user', JSON.stringify(result.body))
        this.isUserLoggedIn.next(true);
        this.route.navigate([''])
      }
      console.log(result)
    })
  }
  logInUser(data:logIn){
    this.http.get(`https://online-shop-abay.onrender.com/userData?email=${data.email}&password=${data.password}`, { observe:'response' }).subscribe((result:any)=>{
      if(result && result.body && result.body.length){
        localStorage.setItem('user', JSON.stringify(result.body[0]))
        console.log('user Login')
        this.route.navigate([''])
      }else{
        console.log("user not login")
        this.isLogInError.emit(true)
      }
    })
  }
  userAuthReload(){
    if(localStorage.getItem('user')){
      this.route.navigate(['/'])
    }
  }
}
