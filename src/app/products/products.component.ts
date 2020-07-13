import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Observable, Subscription } from 'rxjs';
import { Product } from '../models/product';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {

  products: Product[] = [];
  filteredProducts: Product[]= [];
  productSubscription: Subscription;

  categories: Category[] = [];
  categoriesSubscription: Subscription;

  selectedCategory: string;
  selectedCategorySubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private productService : ProductService,
    private categoryService: CategoryService) {}

  ngOnDestroy(): void {
    this.productSubscription.unsubscribe();
    this.categoriesSubscription.unsubscribe();
    this.selectedCategorySubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.initProducts();
    this.initCategories();
    this.initFilters();
  }

  initProducts(){
    this.productSubscription = this.productService.getAll()
                                                  .subscribe(products => this.products = products)
  }

  initCategories(){
    this.categoriesSubscription = this.categoryService.getAll()
                                                      .subscribe(categories => 
                                                                this.categories = categories)
  }

  initFilters(){
    this.initFilteringByCategory();
  }

  initFilteringByCategory(){
    this.selectedCategorySubscription = this.route.queryParamMap.subscribe(params =>{
      this.selectedCategory = params.get('category');

      this.filteredProducts = (this.selectedCategory) ?
      this.products.filter(p => p.category === this.selectedCategory) :
      this.products;
    })
  }

}
