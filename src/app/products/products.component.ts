import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Subscription } from 'rxjs';
import { Product } from '../models/product';
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

  selectedCategory: string;
  selectedCategorySubscription: Subscription;

  constructor(private route: ActivatedRoute,
              private productService : ProductService) {}

  ngOnDestroy(): void {
    this.productSubscription.unsubscribe();
    this.selectedCategorySubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.initProducts();
  }

  initProducts(): void {
    this.productSubscription = this.productService.getAll()
                                                  .subscribe(products => {
                                                    this.products = products;
                                                    this.initFilteringByCategory();
                                                  })
  }

  initFilteringByCategory() : void {
    this.selectedCategorySubscription = this.route.queryParamMap.subscribe(params =>{
      this.selectedCategory = params.get('category');

      this.filteredProducts = (this.selectedCategory) ?
      this.products.filter(p => p.categoryName === this.selectedCategory) :
      this.products;
    })
  }

}
