import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
categories$: any[];
  constructor(private categoryService: CategoryService) {
    this.categoryService.getCategories().valueChanges().subscribe(snaps => {
      this.categories$ = snaps;
    })
   }

  ngOnInit(): void {
  }

}
