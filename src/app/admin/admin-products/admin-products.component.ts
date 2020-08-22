import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product';
import { map, filter, switchMap } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: Product[];
  filteredProducts: Product[];
  productSubscription: Subscription;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<Product> = new Subject();

  constructor(private productService: ProductService) { }

  ngOnDestroy(): void {
    this.productSubscription.unsubscribe();
    this.dtTrigger.unsubscribe();
  }

  ngOnInit(): void {
    this.initProducts();
    this.initDataTables();
  }

  initProducts(): void{
    this.productSubscription = this.productService.getAll()
                                                  .subscribe(product => {
                                                    this.products = this.filteredProducts = product;
                                                    this.dtTrigger.next();
                                                  });
  }

  filter(query: string): void{
    this.filteredProducts = (query) ?
    this.products.filter(p => p.name.toLowerCase().includes(query.toLowerCase())) :
    this.products;
  }

  initDataTables(): void{
    this.dtOptions = {
      pagingType : 'full_numbers',
      pageLength: 5
    }
  }
}