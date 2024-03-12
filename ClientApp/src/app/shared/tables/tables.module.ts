import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListTablesComponent } from './list-tables/list-tables.component';
import { NgbDropdownModule, NgbPaginationModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { NgPipesModule } from 'ngx-pipes';


@NgModule({
  declarations: [
    ListTablesComponent
  ],
  imports: [
    CommonModule,
    NgbPaginationModule,
    FormsModule,
    NgPipesModule,
    NgbDropdownModule,
    NgbTooltipModule,
  ],
  exports: [ListTablesComponent]
})
export class TablesModule { }
