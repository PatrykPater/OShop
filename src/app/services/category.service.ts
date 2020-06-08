import { Injectable } from '@angular/core';
import { AngularFireObject, AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { Category } from '../models/category';
import { map, filter, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db: AngularFireDatabase) { }

  getCategories(): Observable<Category[]>{
    return this.db.list('/categories', ref => ref.orderByChild('title'))
    .snapshotChanges()
    .pipe(
        map(changes => 
            changes.map(c => ({ key: c.payload.key, ... c.payload.val() as Category})))
    )
  }
}
