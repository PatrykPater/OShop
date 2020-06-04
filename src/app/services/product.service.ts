import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from '@angular/fire/database';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private db: AngularFireDatabase) { }

  create(product: any){
    return this.db.list('/products').push(product);
  }

  getAll() : AngularFireList<Product[]>{
    return this.db.list('/products', ref => ref.orderByChild('title'));
  }

  get(productId : string): AngularFireObject<Product>{
    return this.db.object('/products/' + productId);
  }
}