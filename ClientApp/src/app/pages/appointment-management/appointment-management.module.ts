import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllComponent } from './all/all.component';
import { WaitingComponent } from './waiting/waiting.component';
import { CompletedComponent } from './completed/completed.component';
import { OutOfDateComponent } from './out-of-date/out-of-date.component';
import { CancelledComponent } from './cancelled/cancelled.component';
import { AppointmentManagementRoutingModule } from './appointment-management-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { ComponentsModule } from '../../components/components.module';
import { NgbDropdownModule, NgbPaginationModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';



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
    AppointmentManagementRoutingModule,
    SharedModule,
    ComponentsModule,
    NgbDropdownModule,
    NgbTooltipModule,
    NgbPaginationModule,

  ]
})
export class AppointmentManagementModule { }
