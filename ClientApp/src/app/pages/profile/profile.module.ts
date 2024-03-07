import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientComponent } from './patient/patient.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { DoctorComponent } from './doctor/doctor.component';
import { AdminComponent } from './admin/admin.component';
import { SharedModule } from '../../shared/shared.module';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    PatientComponent,
    DoctorComponent,
    AdminComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    NgbTooltipModule,
    SharedModule
  ]
})
export class ProfileModule { }
