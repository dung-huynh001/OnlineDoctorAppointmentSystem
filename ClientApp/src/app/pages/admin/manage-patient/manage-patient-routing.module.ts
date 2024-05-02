import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPatientComponent } from './add-patient/add-patient.component';
import { ViewPatientComponent } from './view-patient/view-patient.component';
import { EditPatientComponent } from './edit-patient/edit-patient.component';

const routes: Routes = [
  {
    path: 'add-patient',
    component: AddPatientComponent,
  },
  {
    path: 'view-patient/:id',
    component: ViewPatientComponent,
  },
  {
    path: 'edit-patient/:id',
    component: EditPatientComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class ManagePatientRoutingModule { }

