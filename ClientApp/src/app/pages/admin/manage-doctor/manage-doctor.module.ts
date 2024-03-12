import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageDoctorRoutingModule } from './manage-doctor-routing.module';
import { ViewDoctorComponent } from './view-doctor/view-doctor.component';
import { EditDoctorComponent } from './edit-doctor/edit-doctor.component';
import { AddDoctorComponent } from './add-doctor/add-doctor.component';



@NgModule({
  declarations: [
    ViewDoctorComponent,
    EditDoctorComponent,
    AddDoctorComponent
  ],
  imports: [
    CommonModule,
    ManageDoctorRoutingModule
  ]
})
export class ManageDoctorModule { }
