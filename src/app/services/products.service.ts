import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { products } from '../data-type';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  addProducts(data: products) {
    return this.http.post('http://localhost:3000/products', data)
  }
  productList() {
    return this.http.get<products[]>('http://localhost:3000/products')
  }
  deleteProduct(id: number) {
    return this.http.delete(`http://localhost:3000/products/${id}`)
  }
  getProduct(id: number) {
    return this.http.get<products>(`http://localhost:3000/products/${id}`)
  }
  updateProduct(data:products){
    return this.http.put<products>(`http://localhost:3000/products/${data.id}`, data)
  }
}
