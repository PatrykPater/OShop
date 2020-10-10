import { HttpClient } from '@angular/common/http';
import { 
  Component, 
  ElementRef, 
  OnInit, 
  QueryList, 
  ViewChild, 
  ViewChildren,
  AfterViewInit, 
  Renderer2} from '@angular/core';
import { Subject } from 'rxjs';
import { SlideComponent } from './slide/slide.component';

@Component({
  selector: 'carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit, AfterViewInit 
{
  images: string[];
  currentIndex: number = 0;
  currentIndexEmiter = new Subject<number>();

  @ViewChildren(SlideComponent) slides: QueryList<SlideComponent>;
  @ViewChild('carousel_track') carouselTrack: ElementRef<HTMLElement>;
  @ViewChild('carousel_nav') dotsNav: ElementRef;
  @ViewChildren(".carousel_indicator") dots: QueryList<ElementRef>;

  constructor(private renderer: Renderer2) { }
  
  ngAfterViewInit(): void 
  {
    console.log(this.carouselTrack);
  }

  ngOnInit(): void  
  {
   this.initSliders();
   this.emitCurrentIndex();
  }

  moveToNext()
  {
    // this.currentIndex += this.currentIndex + 1;
    // this.emitCurrentIndex();

    this.renderer.setStyle(this.carouselTrack.nativeElement, "transform", "translateX(-984px)");

  }

  moveToPrev()
  {
    // this.currentIndex += this.currentIndex - 1;
    // this.emitCurrentIndex();
  }

  private initSliders()
  {
    this.images = 
   [
     "assets/images/placeholder-1-e1533569576673-960x960.png",
     "assets/images/placeholder-1-e1533569576673-960x960.png",
     "assets/images/placeholder-1-e1533569576673-960x960.png",
   ];
  }

  private emitCurrentIndex()
  {
    this.currentIndexEmiter.next(this.currentIndex);
  }

}
