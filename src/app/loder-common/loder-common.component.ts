import { Component } from '@angular/core';
import { SellerService } from '../services/seller.service';
import { ProductsService } from '../services/products.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-loder-common',
  templateUrl: './loder-common.component.html',
  styleUrls: ['./loder-common.component.scss']
})
export class LoderCommonComponent {
  loader:boolean | undefined;
  constructor(private seller:SellerService, private product:ProductsService,private userdata:UserService){
    // this.seller.loader.subscribe((res) => {
    //   this.loader = res;
    // })
    this.product.loader.subscribe((res) => {
      this.loader = res;
    })
    // this.userdata.loader.subscribe((res) => {
    //   this.loader = res;
    // })
    console.log(this.loader)
  }
  ngOnInit():void{
  }
}
