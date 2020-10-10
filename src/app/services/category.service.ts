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
    return this.httpClient.get<Category[]>(this.Url.categoriesEndPoint);
  }

  getFeatured() : Category[]
  {
    let result = 
    [
      new Category("Category1", "1", "assets/images/placeholder-1-e1533569576673-960x960.png"), 
      new Category("Category2", "2", "assets/images/placeholder-1-e1533569576673-960x960.png"), 
      new Category("Category3", "3", "assets/images/placeholder-1-e1533569576673-960x960.png")
    ];
    
    return result;
  }



}
