import { Component } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { products } from '../data-type';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.scss']
})
export class SellerHomeComponent {
  productList: undefined | products[];
  productGetData: undefined | products;
  expandedItemIds: number[] = [];
  textSeeMore: string = '';

  constructor(private product: ProductsService) { }
  ngOnInit(): void {
    this.listProduct();
  }
  seeMoreBtn(data: any) {
    data.seeMore = !data.seeMore
  }
  listProduct() {
    this.product.productList().subscribe((result) => {
      this.productList = result;
      // console.log(this.product)
    })
  }
  deleteProduct(id: any) {
    this.product.deleteProduct(id).subscribe((result) => {
      if (result) {
        alert('Product is Delete')
      } this.listProduct();
    })
  }
  editProduct(data: number) {
    console.log(data)
    this.product.getProduct(data).subscribe((result) => {
      this.productGetData = result;
      console.log( typeof this.productGetData.price)

    })
  }
  productUpdate(data: products) {
    console.log(data, "btn click")
    if(this.productGetData){
      data.id = this.productGetData.id
    }
    this.product.updateProduct(data).subscribe((result)=>{
      if(result){
        console.log(result,'product updated')
      }
    })
    this.listProduct();

  }
}
