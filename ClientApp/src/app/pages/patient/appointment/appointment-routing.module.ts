import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MakeAppointmentComponent } from '../make-appointment/make-appointment.component';
import { AllComponent } from './all/all.component';
import { OutOfDateComponent } from './out-of-date/out-of-date.component';
import { WaitingComponent } from './waiting/waiting.component';
import { CompletedComponent } from './completed/completed.component';
import { CancelledComponent } from './cancelled/cancelled.component';

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
    path: 'waiting',
    component: WaitingComponent,
  },
  {
    path: 'completed',
    component: CompletedComponent,
  },
  {
    path: 'cancelled',
    component: CancelledComponent,
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class AppointmentRoutingModule { }
