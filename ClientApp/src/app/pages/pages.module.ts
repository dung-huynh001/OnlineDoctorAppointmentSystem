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
import { SitemapComponent } from './sitemap/sitemap.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    MakeAppointmentComponent,
    DashboardComponent,
    ScheduleOfDoctorsComponent,
    MedicalProcessComponent,
    AboutUsComponent,
    CustomerCareComponent,
    SitemapComponent,
  ],
  imports: [
    CommonModule, 
    PagesRoutingModule, 
    SharedModule, 
    ComponentsModule, 
    SlickCarouselModule,
    NgbPaginationModule,
    FormsModule,
    ReactiveFormsModule
  ],
})
export class PagesModule { }
