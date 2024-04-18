import lottie from 'lottie-web';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointmentRoutingModule } from './appointment-routing.module';
import { AllComponent } from './all/all.component';
import { CompletedComponent } from './completed/completed.component';
import { CancelledComponent } from './cancelled/cancelled.component';
import { OutOfDateComponent } from './out-of-date/out-of-date.component';
import { PendingComponent } from './pending/pending.component';
import { SharedModule } from '../../../shared/shared.module';
import { defineElement } from 'lord-icon-element';
import { DataTablesModule } from 'angular-datatables';
import { ViewAppointmentComponent } from './view-appointment/view-appointment.component';
import { ComponentsModule } from '../../../components/components.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FlatpickrModule } from 'angularx-flatpickr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmedComponent } from './confirmed/confirmed.component';
import { NgbNavModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    AllComponent,
    CompletedComponent,
    CancelledComponent,
    OutOfDateComponent,
    PendingComponent,
    ViewAppointmentComponent,
    ConfirmedComponent
  ],
  imports: [
    CommonModule,
    AppointmentRoutingModule,
    SharedModule,
    DataTablesModule,
    ComponentsModule,
    NgxSpinnerModule,
    FlatpickrModule,
    FormsModule,
    ReactiveFormsModule,
    NgbNavModule,
    NgbTooltipModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppointmentModule { 
  constructor() {
    defineElement(lottie.loadAnimation);
  }
}
