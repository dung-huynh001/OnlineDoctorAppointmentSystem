import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ComingSoonComponent } from './coming-soon/coming-soon.component';
import { MaintenanceComponent } from './maintenance/maintenance.component';

const routes: Routes = [  
  { path: 'page-not-found', component: PageNotFoundComponent },
  { path: 'coming-soon', component: ComingSoonComponent},
  { path: 'maintenance', component: MaintenanceComponent}
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class ExtraPagesRoutingModule { }
