import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepartmentComponent } from './department/department.component';
import { ManageScheduleComponent } from './manage-schedule/manage-schedule.component';
import { ManageDoctorComponent } from './manage-doctor/manage-doctor.component';
import { AssignScheduleComponent } from './assign-schedule/assign-schedule.component';
import { DashboardComponent } from './dashboard/dashboard.component';


const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'manage-department',
    component: DepartmentComponent
  },
  {
    path: 'manage-doctor',
    component: ManageDoctorComponent
  },
  {
    path: 'manage-doctor',
    loadChildren: () => import('./manage-doctor/manage-doctor.module').then((m) => m.ManageDoctorModule)
  },
  {
    path: 'appointment',
    loadChildren: () => import('./manage-appointment/appointment.module').then((m) => m.AppointmentModule)
  },
  {
    path: 'schedule',
    component: ManageScheduleComponent,
  },
  {
    path: 'assign-schedule/:id',
    component: AssignScheduleComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
