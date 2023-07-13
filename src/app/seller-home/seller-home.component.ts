import { Component } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { products } from '../data-type';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.scss']
})
export class SellerHomeComponent {
  productList:undefined | products[];
  expandedItemIds: number[] = [];
  textSeeMore:string='';

  constructor(private product:ProductsService){}
  ngOnInit(): void {
    this.listProduct();
  }
  seeMoreBtn(data :any){
    data.seeMore = !data.seeMore
  }
  listProduct(){
    this.product.productList().subscribe((result) => {
      this.productList = result;
      // console.log(this.product)
    })
  }
  deleteProduct(id:any){
    this.product.deleteProduct(id).subscribe((result)=>{
      if(result){
        alert('Product is Delete')
      }this.listProduct();
    })
  }
}
