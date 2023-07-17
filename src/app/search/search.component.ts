import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../services/products.service';
import { products } from '../data-type';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  searchData:undefined|products[];
  constructor(private activeRouter: ActivatedRoute, private product: ProductsService){}

  ngOnInit():void{
    this.againSearch();
  }
  againSearch(){
    let query = this.activeRouter.snapshot.paramMap.get('query');
    query && this.product.searchProducts(query).subscribe((result)=>{
      console.log(result)
      this.searchData=result;
    })
  }
}
