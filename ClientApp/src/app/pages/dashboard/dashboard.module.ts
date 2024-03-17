import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { PatientDashboardComponent } from './patient-dashboard/patient-dashboard.component';
import { DoctorDashboardComponent } from './doctor-dashboard/doctor-dashboard.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { NgbDropdownModule, NgbPaginationModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CountUpModule } from 'ngx-countup';
import { ComponentsModule } from '../../components/components.module';
import { AccountModule } from '../../account/account.module';
import { SharedModule } from '../../shared/shared.module';



@NgModule({
  declarations: [
    PatientDashboardComponent,
    DoctorDashboardComponent,
    AdminDashboardComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NgbPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    NgbDropdownModule,
    NgbTooltipModule,
    CountUpModule,
    ComponentsModule,
    AccountModule,
    SharedModule
  ]
})
export class DashboardModule { }
