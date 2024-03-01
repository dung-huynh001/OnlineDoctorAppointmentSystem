import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import path from 'path';
import { AllComponent } from './all/all.component';
import { WaitingComponent } from './waiting/waiting.component';
import { CompletedComponent } from './completed/completed.component';
import { OutOfDateComponent } from './out-of-date/out-of-date.component';
import { CancelledComponent } from './cancelled/cancelled.component';

const routes: Routes = [
  {
    path: '', component: AllComponent
  },
  {
    path: 'waiting', component: WaitingComponent
  },
  {
    path: 'completed', component: CompletedComponent
  },
  {
    path: 'out-of-date', component: OutOfDateComponent
  },
  {
    path: 'cancelled', component: CancelledComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AppointmentManagementRoutingModule { }
