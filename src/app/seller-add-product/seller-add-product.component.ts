import { Component, ViewChild } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { products } from '../data-type';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.scss']
})
export class SellerAddProductComponent {
  @ViewChild('addProductItem', { static: false }) addProductItem: NgForm | undefined;
  addProductMessage: string | undefined;
  constructor(private productService:ProductsService) {

  }
  ngOnInit(): void { 
    
  }
  addProduct(data: products) {
    this.productService.addProducts(data).subscribe((result)=>{
      if(result){
        this.addProductMessage = "Product Added Successfully"
      }
      alert(this.addProductMessage);      
    });
    this.addProductItem?.resetForm();
  }
}
