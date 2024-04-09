import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageAppointmentRoutingModule } from './manage-appointment-routing.module';
import { AllComponent } from './all/all.component';
import { ConfirmedComponent } from './confirmed/confirmed.component';
import { CompletedComponent } from './completed/completed.component';
import { CancelledComponent } from './cancelled/cancelled.component';
import { PendingComponent } from './pending/pending.component';
import { OutOfDateComponent } from './out-of-date/out-of-date.component';
import { SharedModule } from '../../../shared/shared.module';
import { ComponentsModule } from '../../../components/components.module';
import { NgxSpinnerModule } from 'ngx-spinner';



@NgModule({
  declarations: [
    AllComponent,
    ConfirmedComponent,
    CompletedComponent,
    CancelledComponent,
    PendingComponent,
    OutOfDateComponent
  ],
  imports: [
    CommonModule,
    ManageAppointmentRoutingModule,
    SharedModule,
    ComponentsModule,
    NgxSpinnerModule
  ]
})
export class ManageAppointmentModule { }
