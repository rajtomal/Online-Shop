import { Component } from '@angular/core';
import { SignUp, logIn, products, userCartData } from '../data-type';
import { UserService } from '../services/user.service';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.scss']
})
export class UserAuthComponent {
  showLogin: boolean = false;
  userLoginError: undefined | string;
  constructor(private user: UserService, private product: ProductsService) { }
  ngOnInit(): void {
    this.user.userAuthReload();
  }
  signUpUser(data: SignUp) {
    this.user.userSignUp(data);
  }
  logInUser(data: logIn) {
    this.user.logInUser(data);
    this.user.isLogInError.subscribe((isError) => {
      if (isError) {
        this.userLoginError = 'Email & Password is not Correct';
        setTimeout(() => {
          this.userLoginError = undefined
        }, 3000);
      } else{
        this.localCartToRemoteCart();
      }
    })
  }
  loginPageUser() {
    this.showLogin = !this.showLogin
  }
  signUpPageUser() {
    this.showLogin = !this.showLogin
  }
  // user login cart system
  localCartToRemoteCart() {
    console.log("called")
    let data = localStorage.getItem('localCart')
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;
    if (data) {
      let cartDataList: products[] = JSON.parse(data)

      cartDataList.forEach((product: products, index) => {
        let cartData: userCartData = {
          ...product,
          productId: product.id,
          userId
        }
        delete cartData.id;
        setTimeout(() => {
          this.product.UserAddToCart(cartData).subscribe((result) => {
            if (result) {
              console.log("item store in DB")
            }
          })
        }, 500);
        if (cartDataList.length === index + 1) {
          localStorage.removeItem('localCart');
        }
      });
    }
    setTimeout(() => {
      this.product.userGetToCart(userId);
    }, 500);
  }
}
