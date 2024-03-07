import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PatientDashboardComponent } from './patient-dashboard/patient-dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: '/patient', pathMatch: 'full' },
  { path: 'patient', component: PatientDashboardComponent },
  { path: 'doctor', component: PatientDashboardComponent },
  { path: 'admin', component: PatientDashboardComponent },
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
