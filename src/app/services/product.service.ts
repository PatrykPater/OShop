import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { map, filter, switchMap, tap, catchError } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private Url = { productEndPoint: 'https://localhost:44322/products' }
  constructor(private httpClient: HttpClient) { }          

  create(product: Product): Subscription {
    return this.httpClient.post<Product>(this.Url.productEndPoint, product)
                          .subscribe(p => p);
  }

  get(productId: number) : Observable<Product>{
    const url = `${this.Url.productEndPoint}/${productId}`;
    return this.httpClient.get<Product>(url);
  }

  getAll(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.Url.productEndPoint);
  }

  update(productId : number, product: Product) : Subscription {
    const url = `${this.Url.productEndPoint}/${productId}`;
    return this.httpClient.put<Product>(url, product)
                          .subscribe(p => p);
  }

  delete(id: number) : Subscription {
    const url = `${this.Url.productEndPoint}/${id}`;
    return this.httpClient.delete(url)
                          .subscribe(p => p);
  }

  getFeatured() : Product[]
  {
    let result = 
    [
      new Product("Product1", "assets/images/placeholder-1-e1533569576673-960x960.png", 1), 
      new Product("Product2", "assets/images/placeholder-1-e1533569576673-960x960.png", 2), 
      new Product("Product3", "assets/images/placeholder-1-e1533569576673-960x960.png", 3)
    ];
    
    return result;
  }
}