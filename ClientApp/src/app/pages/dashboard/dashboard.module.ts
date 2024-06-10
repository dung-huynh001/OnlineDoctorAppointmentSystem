import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { DoctorDashboardComponent } from './doctor-dashboard/doctor-dashboard.component';
import { PatientDashboardComponent } from './patient-dashboard/patient-dashboard.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgApexchartsModule } from 'ng-apexcharts';
import { SharedModule } from '../../shared/shared.module';
import { FlatpickrModule } from 'angularx-flatpickr';
import { FormsModule } from '@angular/forms';
import { CountUpModule } from 'ngx-countup';
import { DataTablesModule } from 'angular-datatables';




@NgModule({
  declarations: [
    AdminDashboardComponent,
    DoctorDashboardComponent,
    PatientDashboardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NgApexchartsModule,
    NgxSpinnerModule,
    SharedModule,
    FlatpickrModule,
    FormsModule,
    CountUpModule,
    DataTablesModule
  ]
})
export class DashboardModule { }
