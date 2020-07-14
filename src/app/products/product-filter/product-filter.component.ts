import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Category } from 'src/app/models/category';
import { Subscription } from 'rxjs';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit, OnDestroy {

  categories: Category[] = [];
  categoriesSubscription: Subscription;
  @Input('selectedCategory') selectedCategory: string;
  
  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.initCategories();
  }

  ngOnDestroy(): void {
    this.categoriesSubscription.unsubscribe();
  }

  initCategories() : void {
    this.categoriesSubscription = this.categoryService.getAll()
                                                      .subscribe(categories => 
                                                                this.categories = categories)
  }

}
