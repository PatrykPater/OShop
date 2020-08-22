import { Injectable } from '@angular/core';
import { AngularFireObject, AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { Category } from '../models/category';
import { map, filter, switchMap, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private Url = { productEndPoint: 'https://localhost:44322/categories' }
  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(this.Url.productEndPoint)
      .pipe(
        tap(_ => console.log('Categories Fetched'))
      );
  }

}
