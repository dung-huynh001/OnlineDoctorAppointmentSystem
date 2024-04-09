import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditProfileRoutingModule } from './edit-profile-routing.module';
import { AdminComponent } from './admin/admin.component';
import { PatientComponent } from './patient/patient.component';
import { DoctorComponent } from './doctor/doctor.component';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { FlatpickrModule } from 'angularx-flatpickr';
import { NgSelectModule } from '@ng-select/ng-select';




@NgModule({
  declarations: [
    AdminComponent,
    PatientComponent,
    DoctorComponent
  ],
  imports: [
    CommonModule,
    EditProfileRoutingModule,
    NgbNavModule,
    FlatpickrModule,
    NgSelectModule,
  ]
})
export class EditProfileModule { }
