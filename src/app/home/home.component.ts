import { Component, OnInit } from '@angular/core';
import { Category } from '../models/category';
import { CategoryService } from '../services/category.service';
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

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void 
  {
    let categories = this.categoryService.getFeatured();
    this.featuredCategories = this.toCategoryDto(categories);
  }


  toCategoryDto(categories: Category[]) : FeaturedDto
  {
    debugger;
    let featured = new FeaturedDto("Categories");
    let itemsDto = categories.map(c => new FeaturedItemDto(c.name, c.imgUrl));
    itemsDto.forEach(i => featured.Items.push(i));
    return featured;
  }



}
