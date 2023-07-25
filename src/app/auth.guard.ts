import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SellerService } from './services/seller.service';


@Injectable({
  providedIn:'root'
})

export class AuthGuard implements CanActivate {
  constructor(private sellerServics:SellerService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean|UrlTree>|Promise<boolean|UrlTree>|boolean|UrlTree {
      if(localStorage.getItem('seller')){
        return true;
      }else if(localStorage.getItem('sellerLogin')){
        return true;
      }
      // call seller services part 
      return this.sellerServics.isSellerLoggedIn;
    }
  
}