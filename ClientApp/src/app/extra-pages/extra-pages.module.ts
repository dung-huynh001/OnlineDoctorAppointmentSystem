import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExtraPagesRoutingModule } from './extra-pages-routing.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ComingSoonComponent } from './coming-soon/coming-soon.component';
import { MaintenanceComponent } from './maintenance/maintenance.component';
import { AccessDeniedComponent } from './access-denied/access-denied.component';



@NgModule({
  declarations: [
    PageNotFoundComponent,
    ComingSoonComponent,
    MaintenanceComponent,
    AccessDeniedComponent
  ],
  imports: [
    CommonModule,
    ExtraPagesRoutingModule
  ]
})
export class ExtraPagesModule { }
