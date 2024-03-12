import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MakeAppointmentComponent } from './make-appointment/make-appointment.component';

const routes: Routes = [
  {
    path: 'appointment',
    loadChildren: () => import('./appointment/appointment.module').then((m) => m.AppointmentModule)
  },
  {
    path: 'make-appointment',
    component: MakeAppointmentComponent
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class PatientRoutingModule { }
