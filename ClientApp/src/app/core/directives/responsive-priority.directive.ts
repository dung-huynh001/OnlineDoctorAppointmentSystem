import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appResponsivePriority]'
})
export class ResponsivePriorityDirective implements OnInit {

  constructor(private el: ElementRef) { }

  ngOnInit(): void {

  }
}
