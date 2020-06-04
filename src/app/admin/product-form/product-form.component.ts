import { Component, OnInit, OnDestroy } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';
import { map, filter, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

product: Product = this.createProductObject();
categories: any[];

  constructor(
    private router: Router,
    private categoryService: CategoryService,
    private productService: ProductService,
    private route: ActivatedRoute) {}

   ngOnInit(): void {
    this.initProductEdit();
    this.initCategoryDropdown();
  }

   initCategoryDropdown(){
    this.categoryService
        .getCategories()
        .snapshotChanges()
        .subscribe(snaps => {
          this.categories = snaps.map(change => ({
          key: change.payload.key, ...change.payload.val()}));
    });
   };

   initProductEdit(){
    let productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.productService.get(productId)
                         .valueChanges()
                         .subscribe(change => this.product = change);
    };
   };

   save(product: any){
    this.productService.create(product);
    this.router.navigate(['/admin/products']);
   }

   createProductObject() : Product{
     return {title: "", category : "", imageUrl: "", price: 0}
   }
}
