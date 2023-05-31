import { Component } from '@angular/core';
import { SellerService } from '../services/seller.service';
import { Router } from '@angular/router';
import { SignUp } from '../data-type';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.scss']
})
export class SellerAuthComponent {
  constructor(private seller:SellerService, private router: Router){};
  ngOnInit():void{
    this.seller.reloadSeller();
  }
  signUp(data:SignUp):void{
    // post data for seller service
    this.seller.userSignUp(data)
  }
}
