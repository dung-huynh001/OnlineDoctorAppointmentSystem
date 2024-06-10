import lottie from 'lottie-web';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { AdminRoutingModule } from './admin-routing.module';
import { DepartmentComponent } from './department/department.component';
import { defineElement } from 'lord-icon-element';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { ManageScheduleComponent } from './manage-schedule/manage-schedule.component';
import { NgbDropdownModule, NgbNavModule, NgbPagination, NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { ManageDoctorComponent } from './manage-doctor/manage-doctor.component';
import { SharedModule } from '../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { FlatpickrModule } from 'angularx-flatpickr';
import { NgSelectModule } from '@ng-select/ng-select';
import { AssignScheduleComponent } from './assign-schedule/assign-schedule.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ComponentsModule } from '../../components/components.module';
import { ManagePatientComponent } from './manage-patient/manage-patient.component';



@NgModule({
  declarations: [
    DepartmentComponent,
    ManageScheduleComponent,
    ManageDoctorComponent,
    AssignScheduleComponent,
    ManagePatientComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbNavModule,
    SharedModule, 
    NgbTooltip,
    FlatpickrModule,
    NgbPagination,
    NgSelectModule,
    FullCalendarModule,
    NgxSpinnerModule,
    ComponentsModule,
    DataTablesModule,
    NgbDropdownModule
  ],
  exports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AdminModule { 
  constructor() {
    defineElement(lottie.loadAnimation);
  }
}
