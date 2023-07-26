import { Component } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { ActivatedRoute } from '@angular/router';
import { products } from '../data-type';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent {
  productQuantity:number=1;
  productDetailsItem: undefined | products;
  constructor(private product: ProductsService, private activeRouter: ActivatedRoute) { }
  ngOnInit(): void {
    this.detailsProduct();
  }
  detailsProduct(){
    let ProductId: number = Number(this.activeRouter.snapshot.paramMap.get('id'));
    ProductId && this.product.productDetails(ProductId).subscribe((result) => {
      this.productDetailsItem = result
      // console.log(this.productDetailsItem)
    })
  }
  productQuntity(val:string){
    if(this.productQuantity < 20 && val == 'plus'){
      this.productQuantity+=1
    }else if(this.productQuantity > 1 && val == 'min'){
      this.productQuantity-=1
    }
  }
  addToCart(){
    if(this.productDetailsItem){
      this.productDetailsItem.addCartQty = this.productQuantity;
      if(!localStorage.getItem('user')){
        this.product.addCartQtyLocal(this.productDetailsItem)
      }
    }
  }

} 
