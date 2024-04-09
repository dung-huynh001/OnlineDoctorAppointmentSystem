import { TestLibComponent } from './test-lib/test-lib.component';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchedulerRoutingModule } from './scheduler-routing.module';
import { MonthComponent } from './month/month.component';
import { WeekComponent } from './week/week.component';
import { DayComponent } from './day/day.component';
import { HalfMonthComponent } from './half-month/half-month.component';
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
//End test lib

@NgModule({
  declarations: [
    MonthComponent,
    WeekComponent,
    DayComponent,
    TestLibComponent,
    HalfMonthComponent,
    SchedulerComponent,
    CalendarTitleComponent
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

    // ScheduleAllModule,
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
    MonthComponent, 
    WeekComponent, 
    // DayComponent, 
    HalfMonthComponent, 
    CalendarTitleComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SchedulerModule {}
