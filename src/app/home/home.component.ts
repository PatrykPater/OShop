import { Component, OnInit } from '@angular/core';
import { Category } from '../models/category';
import { Product } from '../models/product';
import { CategoryService } from '../services/category.service';
import { ProductService } from '../services/product.service';
import { FeaturedDto } from './featured/featuredDto';
import { FeaturedItemDto } from './featured/FeaturedItemDto';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  featuredCategories: FeaturedDto;
  featuredProducts: FeaturedDto;

  constructor(private categoryService: CategoryService,
              private productService: ProductService) { }

  ngOnInit(): void 
  {
    let categories = this.categoryService.getFeatured();
    this.featuredCategories = this.toCategoryDto(categories);

    let products = this.productService.getFeatured();
    this.featuredProducts = this.toProductyDto(products);

  }


  toCategoryDto(categories: Category[]) : FeaturedDto
  {
    let featured = new FeaturedDto("Categories");
    let itemsDto = categories.map(c => new FeaturedItemDto(c.name, c.imgUrl));
    itemsDto.forEach(i => featured.Items.push(i));
    return featured;
  }

  toProductyDto(categories: Product[]) : FeaturedDto
  {
    let featured = new FeaturedDto("Featured Products");
    let itemsDto = categories.map(c => new FeaturedItemDto(c.name, c.imageUrl));
    itemsDto.forEach(i => featured.Items.push(i));
    return featured;
  }

}
