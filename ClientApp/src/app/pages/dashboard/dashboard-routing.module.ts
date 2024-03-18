import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientDashboardComponent } from './patient-dashboard/patient-dashboard.component';

const currentUser: any = JSON.parse(
  localStorage.getItem('currentUser')!
) as object;

var redirectTo = 'patient';

if (currentUser) {
  switch (currentUser.userType) {
    case 'admin':
      redirectTo = 'admin'
      break;
    case 'doctor':
      redirectTo = 'doctor'
      break;
    default:
      redirectTo = 'patient'
      break;
  }
}

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: redirectTo},
  { path: 'patient', component: PatientDashboardComponent },
  { path: 'doctor', component: PatientDashboardComponent },
  { path: 'admin', component: PatientDashboardComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
