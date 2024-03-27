import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule, DatePipe, DecimalPipe } from '@angular/common';
import { DoctorRoutingModule } from './doctor-routing.module';
import { AppointmentOnSiteComponent } from './appointment-on-site/appointment-on-site.component';
import { PrescriptionsComponent } from './prescriptions/prescriptions.component';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CountUpModule } from 'ngx-countup';
import { ComponentsModule } from '../../components/components.module';



@NgModule({
  declarations: [
    AppointmentOnSiteComponent,
    PrescriptionsComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    DoctorRoutingModule,
    SharedModule,
    FormsModule,
    SharedModule,
    CountUpModule,
    ComponentsModule
  ],
  providers: [
    DecimalPipe,
    DatePipe,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DoctorModule { }
