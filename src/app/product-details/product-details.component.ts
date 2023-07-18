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
  productDetailsItem: undefined | products;
  constructor(private product: ProductsService, private activeRouter: ActivatedRoute) { }
  ngOnInit(): void {
    this.detailsProduct();
  }
  detailsProduct(){
    let ProductId: number = Number(this.activeRouter.snapshot.paramMap.get('id'));
    this.product.productDetails(ProductId).subscribe((result) => {
      this.productDetailsItem = result
      console.log(this.productDetailsItem)
    })
  }

}
