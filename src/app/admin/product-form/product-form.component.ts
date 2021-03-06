import { Component, OnInit, OnDestroy } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/models/category';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit, OnDestroy {
productId: number;
product: Product = this.createProductObject();
categories: Category[];

categorySubscription: Subscription;
productSubscription: Subscription;

  constructor(
    private router: Router,
    private categoryService: CategoryService,
    private productService: ProductService,
    private route: ActivatedRoute) {}


  ngOnDestroy(): void {
    this.categorySubscription.unsubscribe();
    if (this.productId) this.productSubscription.unsubscribe();
  }

   ngOnInit(): void {
    this.initProductEdit();
    this.initCategoryDropdown();
  }

   initCategoryDropdown(){
    this.categorySubscription = this.categoryService
                                    .getAll()
                                    .subscribe(category => this.categories = category);
   };

   initProductEdit(){
    this.productId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.productId) {
        this.productSubscription = this.productService.get(this.productId)
                                                      .subscribe(change => this.product = change);
    };
   };

   save(product: Product){
    if (this.productId) this.productService.update(this.productId, product)
    else this.productService.create(product);
    this.navigateToProductList();
   }

   createProductObject() : Product{
     return {name: "", categoryName : "", imageUrl: "", price: 0, id: undefined, categoryId: 0}
   }

   delete(){
     if (!confirm('Are you sure you want t delete this product')) return;

     this.productService.delete(this.productId);
     this.navigateToProductList();
   }

   navigateToProductList(){
    this.router.navigate(['/admin/products']);
   }
}
