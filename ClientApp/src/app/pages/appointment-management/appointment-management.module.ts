import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllComponent } from './all/all.component';
import { WaitingComponent } from './waiting/waiting.component';
import { CompletedComponent } from './completed/completed.component';
import { OutOfDateComponent } from './out-of-date/out-of-date.component';
import { CancelledComponent } from './cancelled/cancelled.component';
import { AppointmentManagementRoutingModule } from './appointment-management-routing.module';



@NgModule({
  declarations: [
    AllComponent,
    WaitingComponent,
    CompletedComponent,
    OutOfDateComponent,
    CancelledComponent
  ],
  imports: [
    CommonModule,
    AppointmentManagementRoutingModule
  ]
})
export class AppointmentManagementModule { }
