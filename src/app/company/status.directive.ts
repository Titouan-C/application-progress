import { AfterContentInit, Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appStatusDirective]'
})
export class StatusDirective implements AfterContentInit {

  constructor(private el: ElementRef) { }

  ngAfterContentInit() {
    if (this.el.nativeElement.innerText == "Refus") {
      this.el.nativeElement.style.backgroundColor = "red";
    } else if (this.el.nativeElement.innerText == "En Attente") {
      this.el.nativeElement.style.backgroundColor = "orange";
    }
  }

}
