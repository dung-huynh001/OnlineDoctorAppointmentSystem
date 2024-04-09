import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResponsivePriorityDirective } from './responsive-priority.directive';



@NgModule({
  declarations: [
    ResponsivePriorityDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [ResponsivePriorityDirective]
})
export class DirectivesModule { }
