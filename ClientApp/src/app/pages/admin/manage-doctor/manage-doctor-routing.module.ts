import { NgModule } from '@angular/core';
import { AddDoctorComponent } from './add-doctor/add-doctor.component';
import { RouterModule, Routes } from '@angular/router';
import { ViewDoctorComponent } from './view-doctor/view-doctor.component';
import { EditDoctorComponent } from './edit-doctor/edit-doctor.component';

const routes: Routes = [
  {
    path: 'add-doctor',
    component: AddDoctorComponent,
  },
  {
    path: 'view-doctor/:id',
    component: ViewDoctorComponent,
  },
  {
    path: 'edit-doctor/:id',
    component: EditDoctorComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class ManageDoctorRoutingModule { }
