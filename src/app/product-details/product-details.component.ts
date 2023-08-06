import { Component } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { ActivatedRoute } from '@angular/router';
import { products, userCartData } from '../data-type';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent {
  productQuantity: number = 1;
  productDetailsItem: undefined | products;
  removeCart = false;
  cartDataAgain:products|undefined;

  constructor(private product: ProductsService, private activeRouter: ActivatedRoute) { }
  ngOnInit(): void {
    this.detailsProduct();
  }
  detailsProduct() {
    let ProductId: number = Number(this.activeRouter.snapshot.paramMap.get('id'));
    ProductId && this.product.productDetails(ProductId).subscribe((result) => {
      this.productDetailsItem = result
      // console.log(this.productDetailsItem)

      // remove cart code
      let cartData = localStorage.getItem('localCart')
      if (ProductId && cartData) {
        let itemCart = JSON.parse(cartData);
        itemCart = itemCart.filter((item: products) => {
          return ProductId == item.id
        })
        // console.log(itemCart)
        if (itemCart.length) {
          this.removeCart = true;
          // console.log(this.removeCart = true)
        } else {
          this.removeCart = false;
          // console.log(this.removeCart = false)
        }
      }
      let localUser = localStorage.getItem('user');
      if(localUser){
        let userId = localUser && JSON.parse(localUser).id
        this.product.userGetToCart(userId);
        this.product.showCartQty.subscribe((result)=>{
        let item = result.filter((item:products)=>{
         return ProductId == item.productId
        })
        if(item.length){
          this.cartDataAgain = item[0];
          this.removeCart=true;
         }
        })
      }
    })
  }
  productQuntity(val: string) {
    if (this.productQuantity < 20 && val == 'plus') {
      this.productQuantity += 1
    } else if (this.productQuantity > 1 && val == 'min') {
      this.productQuantity -= 1
    }
  }
  addToCart() {
    if (this.productDetailsItem) {
      this.productDetailsItem.addCartQty = this.productQuantity;
      if (!localStorage.getItem('user')) {
        this.product.addCartQtyLocal(this.productDetailsItem)
        this.removeCart = true
      } else if (localStorage.getItem('user')) {
        let localUser = localStorage.getItem('user');
        let userId = localUser && JSON.parse(localUser).id
        let cartData: userCartData = {
          ...this.productDetailsItem,
          userId,
          productId: this.productDetailsItem.id,
        }
        delete cartData.id;
        // remove button show
        this.product.UserAddToCart(cartData).subscribe((result) => {
          console.log(result)
          if(result){
            this.product.userGetToCart(userId);
            this.removeCart = true
          }
        })
      }
    }
  }
  removeToCart(id: any) {
    if (!localStorage.getItem('user')) {
      this.removeCart = false
      this.product.removeCartQtyLocal(id)
    }else{
      let localUser = localStorage.getItem('user');
      let userId = localUser && JSON.parse(localUser).id
      this.cartDataAgain && this.product.deleteCart(this.cartDataAgain.id).subscribe((result)=>{
        if(result){
          this.product.userGetToCart(userId)
        }
      })
      this.removeCart = false;
      console.log(this.cartDataAgain?.id)
    }
    // remove database http
    // this.product.deleteCart(id).subscribe((result) => {
    //   if (result) {
    //     alert('Product is Delete')
    //     console.log(result)
    //   } this.addToCart();
    // })
  }
}