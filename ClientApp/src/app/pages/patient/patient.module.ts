import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientRoutingModule } from './patient-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '../../components/components.module';
import { MakeAppointmentComponent } from './make-appointment/make-appointment.component';
import { FlatpickrModule } from 'angularx-flatpickr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SimplebarAngularModule } from 'simplebar-angular';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';




@NgModule({
  declarations: [
    MakeAppointmentComponent
  ],
  imports: [
    CommonModule,
    PatientRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    FlatpickrModule.forRoot(),
    NgxSpinnerModule,
    SimplebarAngularModule,
    NgbModalModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PatientModule { }
