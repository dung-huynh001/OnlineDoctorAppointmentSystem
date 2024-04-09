import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MakeAppointmentComponent } from '../make-appointment/make-appointment.component';
import { AllComponent } from './all/all.component';
import { OutOfDateComponent } from './out-of-date/out-of-date.component';
import { CompletedComponent } from './completed/completed.component';
import { CancelledComponent } from './cancelled/cancelled.component';
import { ViewAppointmentComponent } from './view-appointment/view-appointment.component';
import { PendingComponent } from './pending/pending.component';
import { ConfirmedComponent } from './confirmed/confirmed.component';

const routes: Routes = [
  {
    path: 'make-appointment',
    component: MakeAppointmentComponent,
  },
  {
    path: 'all',
    component: AllComponent,
  },
  {
    path: 'out-of-date',
    component: OutOfDateComponent,
  },
  {
    path: 'pending',
    component: PendingComponent,
  },
  {
    path: 'completed',
    component: CompletedComponent,
  },
  {
    path: 'cancelled',
    component: CancelledComponent,
  },
  {
    path: 'confirmed',
    component: ConfirmedComponent,
  },
  {
    path: 'view/:id',
    component: ViewAppointmentComponent,
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class AppointmentRoutingModule { }
