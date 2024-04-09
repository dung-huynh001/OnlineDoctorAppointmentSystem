import  lottie  from 'lottie-web';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllComponent } from './all/all.component';
import { CompletedComponent } from './completed/completed.component';
import { CancelledComponent } from './cancelled/cancelled.component';
import { OutOfDateComponent } from './out-of-date/out-of-date.component';
import { AppointmentRoutingModule } from './appointment-routing.module';
import { SharedModule } from '../../../shared/shared.module';
import { ComponentsModule } from '../../../components/components.module';
import { PendingComponent } from './pending/pending.component';
import { ConfirmedComponent } from './confirmed/confirmed.component';
import { DataTablesModule } from 'angular-datatables';
import { defineElement } from 'lord-icon-element';



@NgModule({
  declarations: [
    AllComponent,
    CompletedComponent,
    CancelledComponent,
    OutOfDateComponent,
    PendingComponent,
    ConfirmedComponent
  ],
  imports: [
    CommonModule,
    AppointmentRoutingModule,
    SharedModule,
    ComponentsModule,
    DataTablesModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppointmentModule { 
  constructor() {
    defineElement(lottie.loadAnimation);
  }
}
