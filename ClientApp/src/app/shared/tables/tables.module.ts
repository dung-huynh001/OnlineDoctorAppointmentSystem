import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatatablesComponent } from './datatables/datatables.component';
import { ListTablesComponent } from './list-tables/list-tables.component';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { NgPipesModule } from 'ngx-pipes';



@NgModule({
  declarations: [
    DatatablesComponent,
    ListTablesComponent
  ],
  imports: [
    CommonModule,
    NgbPaginationModule,
    FormsModule,
    NgPipesModule,
  ],
  exports: [ListTablesComponent, DatatablesComponent]
})
export class TablesModule { }
