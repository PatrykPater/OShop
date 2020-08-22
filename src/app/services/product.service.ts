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

  create(product: Product): Observable<Product> {
    return this.httpClient.post<Product>(this.Url.productEndPoint, product)
      .pipe(
        tap(_ => console.log('Product Created'))
      );
  }

  get(productId: number) : Observable<Product>{
    const url = `${this.Url.productEndPoint}/${productId}`;
    return this.httpClient.get<Product>(url)
    .pipe(
      tap(_ => console.log('Product Fetched'))
    );
  }

  getAll(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.Url.productEndPoint)
      .pipe(
        tap(_ => console.log('Products Fetched'))
      );
  }

  update(productId : number, product: Product) : Subscription {
    const url = `${this.Url.productEndPoint}/${productId}`;
    return this.httpClient.put<Product>(url, product)
      .pipe(
        tap(_ => console.log('Product Updated'))
      ).subscribe(p => p);
  }

  delete(id: number): Observable<{}> {
    const url = `${this.Url.productEndPoint}/${id}`;
    return this.httpClient.delete(url)
      .pipe(
        tap(_ => console.log('Product Deleted'))
      );
  }
}