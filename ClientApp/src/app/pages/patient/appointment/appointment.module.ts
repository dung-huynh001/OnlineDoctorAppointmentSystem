import lottie from 'lottie-web';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointmentRoutingModule } from './appointment-routing.module';
import { AllComponent } from './all/all.component';
import { CompletedComponent } from './completed/completed.component';
import { CancelledComponent } from './cancelled/cancelled.component';
import { OutOfDateComponent } from './out-of-date/out-of-date.component';
import { WaitingComponent } from './waiting/waiting.component';
import { SharedModule } from '../../../shared/shared.module';
import { defineElement } from 'lord-icon-element';
import { DataTablesModule } from 'angular-datatables';
import { ViewAppointmentComponent } from './view-appointment/view-appointment.component';



@NgModule({
  declarations: [
    AllComponent,
    CompletedComponent,
    CancelledComponent,
    OutOfDateComponent,
    WaitingComponent,
    ViewAppointmentComponent
  ],
  imports: [
    CommonModule,
    AppointmentRoutingModule,
    SharedModule,
    DataTablesModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppointmentModule { 
  constructor() {
    defineElement(lottie.loadAnimation);
  }
}
