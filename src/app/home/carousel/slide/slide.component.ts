import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.css']
})
export class SlideComponent implements OnInit {
  @Input() image: string;
  @Input() index: number;
  @Input() currentIndex: number;
  constructor() { }
  ngOnInit(): void {}
}
