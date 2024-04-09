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
import { NgbNavModule, NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { ProfileComponent } from './profile/profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CountUpModule } from 'ngx-countup';
import { DataTablesModule } from 'angular-datatables';
import { ScheduleOfDoctorComponent } from './schedule-of-doctor/schedule-of-doctor.component';
import { FullCalendarModule } from '@fullcalendar/angular';




@NgModule({
  declarations: [
    MakeAppointmentComponent,
    ProfileComponent,
    EditProfileComponent,
    DashboardComponent,
    ScheduleOfDoctorComponent
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
    NgbNavModule,
    NgbTooltip,
    CountUpModule,
    DataTablesModule,
    FullCalendarModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PatientModule { }
