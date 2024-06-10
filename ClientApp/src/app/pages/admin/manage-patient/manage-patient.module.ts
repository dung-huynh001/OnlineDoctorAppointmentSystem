import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagePatientRoutingModule } from './manage-patient-routing.module';
import { ViewPatientComponent } from './view-patient/view-patient.component';
import { EditPatientComponent } from './edit-patient/edit-patient.component';
import { AddPatientComponent } from './add-patient/add-patient.component';
import { SharedModule } from '../../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    ViewPatientComponent,
    EditPatientComponent,
    AddPatientComponent,
  ],
  imports: [
    CommonModule,
    ManagePatientRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    NgbModalModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ManagePatientModule { }
