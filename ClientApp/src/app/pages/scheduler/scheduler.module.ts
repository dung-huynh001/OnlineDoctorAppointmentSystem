import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchedulerRoutingModule } from './scheduler-routing.module';

import { NgbDropdownModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { SchedulerComponent } from './scheduler.component';
import { CalendarTitleComponent } from './calendar-title/calendar-title.component';
import { DataTablesModule } from 'angular-datatables';
import { FullCalendarModule } from '@fullcalendar/angular';

//Test Lib
import {
  // ScheduleAllModule,
  ScheduleModule,
  RecurrenceEditorAllModule,
  DayService,
  WeekService,
  WorkWeekService,
  MonthService,
  MonthAgendaService,
} from "@syncfusion/ej2-angular-schedule";
import { FlatpickrModule } from 'angularx-flatpickr';
import { FormsModule } from '@angular/forms';
import { CalendarComponent } from './calendar/calendar.component';
//End test lib

@NgModule({
  declarations: [
    SchedulerComponent,
    CalendarTitleComponent,
    CalendarComponent
  ],
  imports: [
    CommonModule,
    SchedulerRoutingModule,
    NgbNavModule,
    NgbDropdownModule,
    DataTablesModule,
    FullCalendarModule,
    FlatpickrModule,
    FormsModule,
    ScheduleModule,
    RecurrenceEditorAllModule
  ],
  providers: [ 
    DayService,
    WeekService,
    WorkWeekService,
    MonthService,
    MonthAgendaService,
  ],
  exports: [
    CalendarTitleComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SchedulerModule {}
