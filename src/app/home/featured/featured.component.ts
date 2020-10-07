import { Component, Input, OnInit } from '@angular/core';
import { FeaturedDto } from './featuredDto';

@Component({
  selector: 'featured',
  templateUrl: './featured.component.html',
  styleUrls: ['./featured.component.css']
})
export class FeaturedComponent implements OnInit {
  @Input() featured: FeaturedDto;
  constructor() { }

  ngOnInit(): void {
  }

}
