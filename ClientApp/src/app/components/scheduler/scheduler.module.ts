import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbDropdownModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { SchedulerComponent } from './scheduler.component';
import { CalendarTitleComponent } from './calendar-title/calendar-title.component';

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
import { NgxSpinnerModule } from 'ngx-spinner';
import { SharedModule } from '../../shared/shared.module';
//End test lib

@NgModule({
  declarations: [
    SchedulerComponent,
    CalendarTitleComponent,
    CalendarComponent
  ],
  imports: [
    CommonModule,
    NgbNavModule,
    NgbDropdownModule,
    FlatpickrModule,
    FormsModule,
    ScheduleModule,
    RecurrenceEditorAllModule,
    NgxSpinnerModule,
    SharedModule
  ],
  providers: [ 
    DayService,
    WeekService,
    WorkWeekService,
    MonthService,
    MonthAgendaService,
  ],
  exports: [
    CalendarTitleComponent,
    CalendarComponent,
    SchedulerComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SchedulerModule {}
