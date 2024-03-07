import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientComponent } from './patient/patient.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { DoctorComponent } from './doctor/doctor.component';
import { AdminComponent } from './admin/admin.component';
import { SharedModule } from '../../shared/shared.module';



@NgModule({
  declarations: [
    PatientComponent,
    DoctorComponent,
    AdminComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    SharedModule
  ]
})
export class ProfileModule { }
