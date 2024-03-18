import lottie from 'lottie-web';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { AdminRoutingModule } from './admin-routing.module';
import { DepartmentComponent } from './department/department.component';
import { defineElement } from 'lord-icon-element';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { ManageScheduleComponent } from './manage-schedule/manage-schedule.component';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { CountUpModule } from 'ngx-countup';
import { ManageDoctorComponent } from './manage-doctor/manage-doctor.component';
import { SharedModule } from '../../shared/shared.module';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    DepartmentComponent,
    ManageScheduleComponent,
    ManageDoctorComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    NgbNavModule,
    CountUpModule,
    SharedModule, 
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AdminModule { 
  constructor() {
    defineElement(lottie.loadAnimation);
  }
}
