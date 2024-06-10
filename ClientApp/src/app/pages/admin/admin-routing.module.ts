import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepartmentComponent } from './department/department.component';
import { ManageScheduleComponent } from './manage-schedule/manage-schedule.component';
import { ManageDoctorComponent } from './manage-doctor/manage-doctor.component';
import { AssignScheduleComponent } from './assign-schedule/assign-schedule.component';
import { ManagePatientComponent } from './manage-patient/manage-patient.component';


const routes: Routes = [
  {
    path: 'manage-department',
    component: DepartmentComponent
  },
  {
    path: 'manage-doctor',
    component: ManageDoctorComponent,
  },
  {
    path: 'manage-patient',
    component: ManagePatientComponent,
  },
  {
    path: 'manage-doctor',
    loadChildren: () => import('./manage-doctor/manage-doctor.module').then((m) => m.ManageDoctorModule)
  },
  {
    path: 'manage-patient',
    loadChildren: () => import('./manage-patient/manage-patient.module').then((m) => m.ManagePatientModule)
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
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
