import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { MakeAppointmentComponent } from './make-appointment/make-appointment.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ScheduleOfDoctorsComponent } from './schedule-of-doctors/schedule-of-doctors.component';
import { MedicalProcessComponent } from './medical-process/medical-process.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { CustomerCareComponent } from './customer-care/customer-care.component';
import { SharedModule } from '../shared/shared.module';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  declarations: [
    MakeAppointmentComponent,
    DashboardComponent,
    ScheduleOfDoctorsComponent,
    MedicalProcessComponent,
    AboutUsComponent,
    CustomerCareComponent,
  ],
  imports: [CommonModule, PagesRoutingModule, SharedModule, ComponentsModule],
})
export class PagesModule {}
