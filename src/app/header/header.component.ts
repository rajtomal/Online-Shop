import { ChangeDetectorRef, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ProductsService } from '../services/products.service';
import { products } from '../data-type';
import { SearchComponent } from '../search/search.component';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  menuType: string = 'default';
  sellerName: string = '';
  userName: undefined | string;
  blank: undefined | string;
  showCart = 0;
  searchResult: undefined | products[];
  constructor(private route: Router, private product: ProductsService, private changeDetector: ChangeDetectorRef) { }
  ngOnInit(): void {
    this.route.events.subscribe((val: any) => {
      if (val.url) {
        if (localStorage.getItem('seller') && val.url.includes('seller')) {
          // signup seller
          // console.log("SignUp seller")
          let sellerStore: any = localStorage.getItem('seller');
          let sellerData: any = sellerStore && JSON.parse(sellerStore);
          this.sellerName = sellerData.name;
          this.menuType = 'seller';
        } else if (localStorage.getItem('user')) {
          // signup seller
          // console.log("SignUp user")
          let userStore: any = localStorage.getItem('user');
          let userData: any = userStore && JSON.parse(userStore);
          this.userName = userData.name;
          this.menuType = 'user';
          this.product.userGetToCart(userData.id)
        } else {
          // console.log("not seller")
          this.menuType = 'default';
        }
      }
    });


    let cartData = localStorage.getItem('localCart')
    if(cartData){
      this.showCart = JSON.parse(cartData).length
    }
    this.product.showCartQty.subscribe((result) => {
      this.showCart = result.length
    })

    // user Cart Qty
    // this.product.userGetToCart().subscribe((result)=>{
    //   if(result){
    //     this.showCart = result.length
    //     console.log(result.length,result)
    //   }
    // })


  }
  logOut() {
    if (localStorage.getItem('seller')) {
      localStorage.removeItem('seller');
      this.route.navigate(['']);
    } else if (localStorage.getItem('user')) {
      localStorage.removeItem('user');
      this.route.navigate(['']);
    }
    this.product.showCartQty.emit([])
  }
  searchProdutsItem(query: KeyboardEvent) {
    if (query) {
      const element = query.target as HTMLInputElement;
      this.product.searchProducts(element.value).subscribe((result) => {
        if (result.length > 5) {
          result.length = 5
        }
        this.searchResult = result
      })
    }
  }
  hidesuggestion() {
    this.searchResult = undefined
    // setTimeout(() => {
    // }, 300);
  }
  submitSearchData(data: string) {
    this.route.navigate([`search/${data}`])
    data = ''
  }
  suggData(data: number) {
    // console.log(data,"click")
    this.route.navigate([`product-details/${data}`])
    this.blank = ''
  }
}
