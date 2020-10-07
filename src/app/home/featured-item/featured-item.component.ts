import { Component, OnInit, Input } from '@angular/core';
import { FeaturedItemDto } from '../featured/FeaturedItemDto';

@Component({
  selector: 'featured-item',
  templateUrl: './featured-item.component.html',
  styleUrls: ['./featured-item.component.css']
})
export class FeaturedItemComponent implements OnInit {
  @Input() featuredItem: FeaturedItemDto;
  constructor() { }

  ngOnInit(): void {
  }

}
