import { calendarEvent } from './../../core/models/calendarEvent.model';
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

@NgModule({
  declarations: [
    MonthComponent,
    WeekComponent,
    DayComponent,
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
  ],
  exports: [MonthComponent, WeekComponent, DayComponent, HalfMonthComponent, CalendarTitleComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SchedulerModule {}
