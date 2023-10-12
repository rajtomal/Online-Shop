import { Component } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { products } from '../data-type';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.scss']
})
export class CartDetailsComponent {
  cartAllData: undefined | products[];
  emptyCart:boolean=false;
  orderSummaryData:number=0;;
  totalPrice:number=0
  constructor(private product:ProductsService){}
  ngOnInit():void{
    this.ShowCartData();
    
  }
  ShowCartData(){
    this.product.cartData.subscribe((result)=>{
      this.cartAllData = result;
      // console.log(result)
      const intialValue = 0;
      this.totalPrice = this.cartAllData.reduce((acc, value) => acc + Number (value.price), intialValue)
    });
  }
  cartItemRemove(id:number){
    this.product.deleteCart(id).subscribe((result)=>{
      this.cartAllData = this.cartAllData?.filter((res)=> res.id !== id);
    })
  }
  orderSummary(){
    this.cartAllData
  }

}
