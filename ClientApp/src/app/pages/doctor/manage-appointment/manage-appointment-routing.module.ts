import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AllComponent } from './all/all.component';
import { PendingComponent } from './pending/pending.component';
import { CompletedComponent } from './completed/completed.component';
import { ConfirmedComponent } from './confirmed/confirmed.component';
import { CancelledComponent } from './cancelled/cancelled.component';
import { OutOfDateComponent } from './out-of-date/out-of-date.component';

const routes: Routes = [
  { path: 'all', component: AllComponent },
  { path: 'pending', component: PendingComponent }, 
  { path: 'completed', component: CompletedComponent }, 
  { path: 'confirmed', component: ConfirmedComponent }, 
  { path: 'cancelled', component: CancelledComponent },
  { path: 'out-of-date', component: OutOfDateComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule,
  ]
})
export class ManageAppointmentRoutingModule { }
