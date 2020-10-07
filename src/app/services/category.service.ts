import { Injectable } from '@angular/core';
import { Category } from '../models/category';
import { map, filter, switchMap, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private Url = { categoriesEndPoint: 'https://localhost:44322/categories' }
  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Category[]> 
  {
    return this.httpClient.get<Category[]>(this.Url.categoriesEndPoint)
      .pipe(
        tap(_ => console.log('Categories Fetched'))
      );
  }

  getFeatured() : Category[]
  {
    let result = 
    [
      new Category("Category1", "1", "imgurl1"), 
      new Category("Category2", "2", "imgUrl2"), 
      new Category("Category3", "3", "imgUrl3")
    ];
    
    return result;

  }



}
