import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireObject, AngularFireList } from '@angular/fire/database';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db: AngularFireDatabase) { }

  getCategories() : AngularFireList<any[]>{
    return this.db.list('/categories', ref => ref.orderByChild('name'));
  }
}
