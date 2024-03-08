import lottie  from 'lottie-web';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule, DatePipe, DecimalPipe } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { MakeAppointmentComponent } from './make-appointment/make-appointment.component';
import { ScheduleOfDoctorsComponent } from './schedule-of-doctors/schedule-of-doctors.component';
import { MedicalProcessComponent } from './medical-process/medical-process.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { CustomerCareComponent } from './customer-care/customer-care.component';
import { SharedModule } from '../shared/shared.module';
import { ComponentsModule } from '../components/components.module';
import { SitemapComponent } from './sitemap/sitemap.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { NgbDropdownModule, NgbPaginationModule, NgbTooltipModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { defineElement } from 'lord-icon-element';
import { FlatpickrModule } from 'angularx-flatpickr';
import { SimplebarAngularModule } from 'simplebar-angular';
import { CountUpModule } from 'ngx-countup';
import { NgbdListSortableHeader } from './schedule-of-doctors/list-sortable.directive';
import { AccountModule } from '../account/account.module';
import { AssignScheduleComponent } from './assign-schedule/assign-schedule.component';
import { NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { FullCalendarModule } from '@fullcalendar/angular';
import { DepartmentManagementComponent } from './department-management/department-management.component';


@NgModule({
  declarations: [
    MakeAppointmentComponent,
    ScheduleOfDoctorsComponent,
    MedicalProcessComponent,
    AboutUsComponent,
    CustomerCareComponent,
    SitemapComponent,
    NgbdListSortableHeader,
    AssignScheduleComponent,
    DepartmentManagementComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule,
    SlickCarouselModule,
    NgbPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    NgbTypeaheadModule,
    NgbDropdownModule,
    NgbTooltipModule,
    CountUpModule,
    FlatpickrModule,
    SimplebarAngularModule,
    ComponentsModule,
    AccountModule,
    NgxMaskPipe,
    PickerModule,
    FullCalendarModule,
  ],
  providers: [
    DecimalPipe,
    DatePipe,
    provideNgxMask(),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PagesModule {
  constructor() {
    defineElement(lottie.loadAnimation);
  }
}
