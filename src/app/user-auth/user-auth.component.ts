import { Component } from '@angular/core';
import { SignUp, logIn } from '../data-type';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.scss']
})
export class UserAuthComponent {
  showLogin: boolean = false;
  userLoginError:undefined | string;
  constructor(private user: UserService) { }
  ngOnInit(): void {
    this.user.userAuthReload();
  }
  logInUser(data: logIn) {
    this.user.logInUser(data);
    this.user.isLogInError.subscribe((isError) => {
      if(isError){
        this.userLoginError = 'Email & Password is not Correct';
        setTimeout(() => {
          this.userLoginError = undefined
        }, 3000);
      }
    })
  }
  signUpUser(data: SignUp) {
    this.user.userSignUp(data);
  }
  loginPageUser() {
    this.showLogin = !this.showLogin
  }
  signUpPageUser() {
    this.showLogin = !this.showLogin
  }
}
