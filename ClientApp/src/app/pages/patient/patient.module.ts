import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientRoutingModule } from './patient-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from '../../components/components.module';
import { MakeAppointmentComponent } from './make-appointment/make-appointment.component';



@NgModule({
  declarations: [
    MakeAppointmentComponent
  ],
  imports: [
    CommonModule,
    PatientRoutingModule,
    SharedModule,
    FormsModule,
    ComponentsModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PatientModule { }
