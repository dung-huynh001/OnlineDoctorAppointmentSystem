import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllComponent } from './all/all.component';
import { WaitingComponent } from './waiting/waiting.component';
import { OutOfDateComponent } from './out-of-date/out-of-date.component';
import { CompletedComponent } from './completed/completed.component';
import { CancelledComponent } from './cancelled/cancelled.component';

const routes: Routes = [
  { path: 'all', component:  AllComponent },
  { path: 'completed', component:  CompletedComponent },
  { path: 'cancelled', component:  CancelledComponent },
  { path: 'out-of-date', component:  OutOfDateComponent },
  { path: 'waiting', component:  WaitingComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AppointmentRoutingModule { }
