import { Component, Input, SimpleChange } from '@angular/core';
import { ActivatedRoute, RouterPreloader } from '@angular/router';
import { ProductsService } from '../services/products.service';
import { products } from '../data-type';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  searchData: undefined | products[];
  constructor(private activeRouter: ActivatedRoute, private product: ProductsService) { }

  ngOnInit(): void {
    this.againSearch();
  }

  againSearch() {
    let query = this.activeRouter.snapshot.paramMap.get('query');
    // console.log(query, "clickedaaaa")
    query && this.product.searchProducts(query).subscribe((result) => {
      this.searchData = result;
      console.log(this.searchData)
    })
  }
}
