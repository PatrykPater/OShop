import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'hero-homepage',
  templateUrl: './hero-homepage.component.html',
  styleUrls: 
  [
    '../home.component.css' ,
    './hero-homepage.component.css'
  ]
})
export class HeroHomepageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
