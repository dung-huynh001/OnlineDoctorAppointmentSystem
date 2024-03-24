import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageDoctorRoutingModule } from './manage-doctor-routing.module';
import { ViewDoctorComponent } from './view-doctor/view-doctor.component';
import { EditDoctorComponent } from './edit-doctor/edit-doctor.component';
import { AddDoctorComponent } from './add-doctor/add-doctor.component';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { NgStepperModule } from 'angular-ng-stepper'
import { SharedModule } from '../../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { DataTablesModule } from 'angular-datatables';
import { NgbNavModule, NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { FlatpickrModule } from 'angularx-flatpickr';
import { NgxSpinnerModule } from 'ngx-spinner';




@NgModule({
  declarations: [
    ViewDoctorComponent,
    EditDoctorComponent,
    AddDoctorComponent,
  ],
  imports: [
    CommonModule,
    ManageDoctorRoutingModule,
    CdkStepperModule,
    NgStepperModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    DataTablesModule,
    NgbTooltip,
    NgbNavModule,
    FlatpickrModule,
    NgxSpinnerModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ManageDoctorModule { }
