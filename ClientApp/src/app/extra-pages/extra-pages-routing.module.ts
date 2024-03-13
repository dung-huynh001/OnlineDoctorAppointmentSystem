import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ComingSoonComponent } from './coming-soon/coming-soon.component';
import { MaintenanceComponent } from './maintenance/maintenance.component';
import { AccessDeniedComponent } from './access-denied/access-denied.component';

const routes: Routes = [  
  { path: 'page-not-found', component: PageNotFoundComponent },
  { path: 'coming-soon', component: ComingSoonComponent},
  { path: 'maintenance', component: MaintenanceComponent},
  { path: 'access-denied', component: AccessDeniedComponent}
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
