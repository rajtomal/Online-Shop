import { Component, ElementRef } from '@angular/core';
import { tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ProductsService } from '../services/products.service';
import { products } from '../data-type';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  menuType: string = 'default';
  sellerName: string = '';
  suggName:undefined | string;
  searchResult:undefined | products[];
  constructor(private route: Router, private product: ProductsService) { }
  ngOnInit(): void {
    this.route.events.subscribe((val: any) => {
      if (val.url) {
        if (localStorage.getItem('seller') && val.url.includes('seller')) {
          console.log("login seller")
          this.menuType = 'seller';
          // seller name to show in display
          if (localStorage.getItem('seller')) {
            let sellerStore: any = localStorage.getItem('seller');
            let sellerData: any = sellerStore && JSON.parse(sellerStore)[0];
            this.sellerName = sellerData.name;
          }
        } else {
          console.log("not seller")
          this.menuType = 'default';
        }
      }
    })
  }
  logOut() {
    localStorage.removeItem('seller');
    this.route.navigate(['/']);
  }
  searchProdutsItem(query: KeyboardEvent) {
    if (query) {
      const element = query.target as HTMLInputElement ;
      this.product.searchProducts(element.value).subscribe((result) => {
        if(result.length>5){
          result.length = 5
        }
        this.searchResult = result
      })
    }
  }
  hidesuggestion(){
    setTimeout(() => {
      this.searchResult=undefined
    }, 300);
  }
  submitSearchData(data: string){
    this.route.navigate([`search/${data}`])
    
  }
  suggData(data:string){
    console.log(data,"click")
    this.suggName = data
  }
}
