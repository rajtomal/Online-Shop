import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { products } from '../data-type';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
// import Slider from '../../assets/images/slider-1.jpg';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  trendyProductsItem: undefined | products[];
  loading: boolean = false;

  constructor(private Product: ProductsService, private route: Router) { };

  ngOnInit(): void {
    this.loading = true
    this.Product.trendyProducts().pipe(finalize(() => this.loading = false)).subscribe({
      next: (result) => {
        console.log(result)
        this.trendyProductsItem = result
        console.log(this.trendyProductsItem)
      },
      error: (err) => {

      }

      // console.log(result)
      // this.trendyProductsItem = result
      // console.log(this.trendyProductsItem)
    })
  }
  imagesAll = [
    {
      images: '../../assets/images/slider-1.jpg'
    },
    {
      images: '../../assets/images/slider-2.jpg'
    },
    {
      images: '../../assets/images/slider-3.jpg'
    },
    {
      images: '../../assets/images/slider-4.jpg'
    }
  ]
  moreDetails(id: number) {
    // console.log(id)
    this.route.navigate([`product-details/${id}`])
  }
  addToCart(num: number) {
    console.log(num)
  }
}
