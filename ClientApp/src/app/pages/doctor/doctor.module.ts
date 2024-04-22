import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule, DatePipe, DecimalPipe } from '@angular/common';
import { DoctorRoutingModule } from './doctor-routing.module';
import { AppointmentOnSiteComponent } from './appointment-on-site/appointment-on-site.component';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CountUpModule } from 'ngx-countup';
import { ComponentsModule } from '../../components/components.module';
import { SchedulerModule } from '../../components/scheduler/scheduler.module';
import {
  NgbDropdownModule,
  NgbNavModule,
  NgbTooltip,
} from '@ng-bootstrap/ng-bootstrap';
import {
  DayService,
  MonthAgendaService,
  MonthService,
  RecurrenceEditorAllModule,
  ScheduleModule,
  WeekService,
  WorkWeekService,
} from '@syncfusion/ej2-angular-schedule';
import { FlatpickrModule } from 'angularx-flatpickr';

import { TimePickerModule } from '@syncfusion/ej2-angular-calendars';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { DateTimePickerModule } from '@syncfusion/ej2-angular-calendars';
import { DataTablesModule } from 'angular-datatables';
import { ProfileComponent } from './profile/profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [
    AppointmentOnSiteComponent,
    DashboardComponent,
    ProfileComponent,
    EditProfileComponent,
  ],
  imports: [
    CommonModule,
    DoctorRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    CountUpModule,
    ComponentsModule,
    SchedulerModule,
    NgbTooltip,
    ScheduleModule,
    RecurrenceEditorAllModule,
    NgbNavModule,
    NgbDropdownModule,
    FlatpickrModule,
    TimePickerModule,
    DropDownListModule,
    DateTimePickerModule,
    DataTablesModule,
    NgSelectModule,
  ],
  providers: [
    DecimalPipe,
    DatePipe,
    DayService,
    WeekService,
    WorkWeekService,
    MonthService,
    MonthAgendaService,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DoctorModule {}
