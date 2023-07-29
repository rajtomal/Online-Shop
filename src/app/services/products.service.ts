import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { products } from '../data-type';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  showCartQty = new EventEmitter<products[] | []>()
  loader = new BehaviorSubject<boolean>(false)

  constructor(private http: HttpClient) { }

  addProducts(data: products) {
    return this.http.post('https://online-shop-abay.onrender.com/products', data)
  }
  productList() {
    return this.http.get<products[]>('https://online-shop-abay.onrender.com/products')
  }
  deleteProduct(id: number) {
    return this.http.delete(`https://online-shop-abay.onrender.com/products/${id}`)
  }
  getProduct(id: number) {
    return this.http.get<products>(`https://online-shop-abay.onrender.com/products/${id}`)
  }
  updateProduct(data: products) {
    return this.http.put<products>(`https://online-shop-abay.onrender.com/products/${data.id}`, data)
  }
  trendyProducts() {
    return this.http.get<products[]>(`https://online-shop-abay.onrender.com/products?_limit=8`)
  }
  searchProducts(query: string) {
    return this.http.get<products[]>(`https://online-shop-abay.onrender.com/products?q=${query}`)
  }
  productDetails(id: number) {
    return this.http.get<products>(`https://online-shop-abay.onrender.com/products/${id}`)
  }
  addCartQtyLocal(data: products) {
    let cartData = [];
    let localCart = localStorage.getItem('localCart')
    if (!localCart) {
      localStorage.setItem('localCart', JSON.stringify([data]))
    } else {
      cartData = JSON.parse(localCart)
      cartData.push(data);
      localStorage.setItem('localCart', JSON.stringify(cartData))
    }
    this.showCartQty.emit(cartData)
  }
  removeCartQtyLocal(productId: number) {
    let cartData = localStorage.getItem('localCart');
    if (cartData) {
      let items: products[] = JSON.parse(cartData)
      items = items.filter((item: products) => productId !== item.id)
      localStorage.setItem('localCart', JSON.stringify(items))
      this.showCartQty.emit(items)
    }
  }
}
