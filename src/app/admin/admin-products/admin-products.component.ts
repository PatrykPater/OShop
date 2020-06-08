import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product';
import { map, filter, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: Product[];
  filteredProducts: Product[];
  productSubscription: Subscription;

  constructor(private productService: ProductService) { }

  ngOnDestroy(): void {
    this.productSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.initProducts();
  }

  initProducts(){
    this.productSubscription = this.productService.getAll()
                                                  .subscribe(product => this.products = 
                                                                        this.filteredProducts = 
                                                                        product);
  }

  filter(query: string){
    this.filteredProducts = (query) ?
    this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) :
    this.products;
  }
}