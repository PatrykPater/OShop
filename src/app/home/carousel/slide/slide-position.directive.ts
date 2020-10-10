import { AfterViewInit, Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appSlidePosition]'
})
export class SlidePositionDirective implements OnInit, AfterViewInit {

  @Input() index: number = 0;
  @Input() currentIndex: number = 0;

  constructor(private renderer : Renderer2,
              private elRef: ElementRef<HTMLElement>) { }

  ngAfterViewInit(): void 
  {
    let value = (this.elRef.nativeElement.getBoundingClientRect().width * this.index) + "px";
    console.log(value);
    this.renderer.setStyle(this.elRef.nativeElement, "left", value);
    if(this.index == this.currentIndex) this.renderer.addClass(this.elRef.nativeElement, "current-slide")
  }

  ngOnInit(): void {}
}
