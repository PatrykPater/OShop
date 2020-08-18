import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from '@angular/fire/database';
import { Product } from '../models/product';
import { map, filter, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ThrowStmt } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private db: AngularFireDatabase) { }

  create(product: Product){
    return this.db.list('/products').push(product);
  }

  getAll(): Observable<Product[]>{
    return this.db.list('/products', ref => ref.orderByChild('title'))
    .snapshotChanges()
    .pipe(
        map(changes => 
            changes.map(c => ({ key: c.payload.key, ... c.payload.val() as Product})))
    )
  }

  get(productId : string): Observable<Product>{
    return this.db.object('/products/' + productId)
    .valueChanges()
    .pipe(map(product => product as Product));
  }

  update(productId : string, product: Product){
    return this.db.object('/products/' + productId).update(product);
  }

  delete(productId: string){
    return this.db.object('/products/' + productId).remove();
  }
}