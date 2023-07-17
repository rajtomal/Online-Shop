import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { products } from '../data-type';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {  
  trendyProductsItem: undefined | products[];


  constructor(private Product: ProductsService){};

  ngOnInit():void {
    this.Product.trendyProducts().subscribe((result) => {
      console.log(result)
      this.trendyProductsItem = result
    })
  }
  imagesAll = [
    {
      images : 'https://azse77seaprodsa.blob.core.windows.net/b2b-dr-pickaboocdn/media/dcastalia_hybridslider/image/big_banner_6_.jpg'
    },
    {
      images : 'https://azse77seaprodsa.blob.core.windows.net/b2b-dr-pickaboocdn/media/dcastalia_hybridslider/image/Nord_CE_3_Lite_5G_Series_big_banner_1__1.jpg'
    },
    {
      images : 'https://azse77seaprodsa.blob.core.windows.net/b2b-dr-pickaboocdn/media/dcastalia_hybridslider/image/Big_Banner_5_1_.jpg'
    },
    {
      images : 'https://azse77seaprodsa.blob.core.windows.net/b2b-dr-pickaboocdn/media/dcastalia_hybridslider/image/Big_Banner_9_1_.jpg'
    }
  ]
}
