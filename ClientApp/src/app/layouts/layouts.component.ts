import { AuthService } from './../core/services/auth.service';
import { Component } from '@angular/core';
import { EventService } from '../core/services/event.service';
import { LAYOUT } from './layouts.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layouts',
  templateUrl: './layouts.component.html',
  styleUrl: './layouts.component.scss'
})
export class LayoutsComponent {
  layoutType!: string;

  constructor(private eventService: EventService, private _authService: AuthService, private _router: Router) { }

  ngOnInit(): void {
    this.layoutType = LAYOUT;
    document.body.setAttribute('layout',this.layoutType)

     // listen to event and change the layout, theme, etc
     this.eventService.subscribe('changeLayout', (layout) => {
      this.layoutType = layout;
    });
    
    
  }

  /**
  * Check if the vertical layout is requested
  */
   isVerticalLayoutRequested() {
    return this.layoutType === 'vertical';
  }

    /**
   * Check if the semibox layout is requested
   */
    isSemiboxLayoutRequested() {
      return this.layoutType === 'semibox';
    }
  
  /**
   * Check if the horizontal layout is requested
   */
   isHorizontalLayoutRequested() {
    return this.layoutType === 'horizontal';
  }

  /**
   * Check if the horizontal layout is requested
   */
   isTwoColumnLayoutRequested() {
    return this.layoutType === 'twocolumn';
  }
}
