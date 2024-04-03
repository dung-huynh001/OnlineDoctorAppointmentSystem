import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { INITIAL_EVENTS, createEventId } from './event-utils';
import {
  CalendarOptions,
  EventApi,
  EventClickArg,
  EventInput,
  Calendar,
  DateSelectArg
} from '@fullcalendar/core';
import { ResourceInput } from '@fullcalendar/resource-common';
import { FullCalendarComponent,  } from '@fullcalendar/angular';
// import dayGridPlugin from '@fullcalendar/daygrid';
// import timeGridPlugin from '@fullcalendar/timegrid';
// import listPlugin from '@fullcalendar/list';
// import interactionPlugin from '@fullcalendar/interaction';
// import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
// import { DateTimeFormatter, LocalDateTime, ZonedDateTime } from '@js-joda/core';


@Component({
  selector: 'app-week',
  templateUrl: './week.component.html',
  styleUrl: './week.component.scss'
})
export class WeekComponent {
  
}
