import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointmentRoutingModule } from './appointment-routing.module';
import { AllComponent } from './all/all.component';
import { CompletedComponent } from './completed/completed.component';
import { CancelledComponent } from './cancelled/cancelled.component';
import { OutOfDateComponent } from './out-of-date/out-of-date.component';
import { WaitingComponent } from './waiting/waiting.component';



@NgModule({
  declarations: [
    AllComponent,
    CompletedComponent,
    CancelledComponent,
    OutOfDateComponent,
    WaitingComponent
  ],
  imports: [
    CommonModule,
    AppointmentRoutingModule,
  ]
})
export class AppointmentModule { }
