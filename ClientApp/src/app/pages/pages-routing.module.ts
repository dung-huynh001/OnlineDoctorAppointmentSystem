import { ScheduleOfDoctorsComponent } from './schedule-of-doctors/schedule-of-doctors.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/guards/auth.guard';
import { MakeAppointmentComponent } from './make-appointment/make-appointment.component';
import { CustomerCareComponent } from './customer-care/customer-care.component';
import { MedicalProcessComponent } from './medical-process/medical-process.component';
import { AboutUsComponent } from './about-us/about-us.component';

const routes: Routes = [
  {
    path: '', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'make-appointment', component: MakeAppointmentComponent
  },
  {
    path: 'appointment-management', 
    loadChildren: () => import('./appointment-management/appointment-management.module').then(m => m.AppointmentManagementModule)
  },
  {
    path: 'help', redirectTo: 'pages/coming-soon'
  },
  {
    path: 'medical-process', component: MedicalProcessComponent
  },
  {
    path: 'about', component: AboutUsComponent
  },
  {
    path: 'schedule-of-doctors', component: ScheduleOfDoctorsComponent
  },
];


@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
