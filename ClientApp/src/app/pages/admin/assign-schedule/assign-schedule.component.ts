import multiMonthPlugin from '@fullcalendar/multimonth';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import dayGridPlugin from '@fullcalendar/daygrid';
import {
  Component,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import {
  CalendarOptions,
  EventApi,
  EventClickArg,
  EventInput,
} from '@fullcalendar/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ScheduleService } from '../../../core/services/schedule.service';
import {
  catchError,
  throwError,
  Subscription,
  first,
  map,
  finalize,
} from 'rxjs';
import { ToastService } from '../../../core/services/toast.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-assign-schedule',
  templateUrl: './assign-schedule.component.html',
  styleUrl: './assign-schedule.component.scss',
})
export class AssignScheduleComponent implements OnInit, OnDestroy {
  private addEvent$!: Subscription;
  private fetchEvent$!: Subscription;
  breadCrumbItems!: Array<{}>;

  calendarEvents!: EventInput[];
  currentEvents: EventApi[] = [];
  calendarApi: any;

  addEventFormGroup!: FormGroup;
  submitted: boolean = false;
  @ViewChild('AddOrUpdateModal') AddOrUpdateModal!: TemplateRef<any>;
  @ViewChild('ViewModal') ViewModal!: TemplateRef<any>;
  mStartTime: string = '07:00';
  mEndTime: string = '11:00';
  aStartTime: string = '13:00';
  aEndTime: string = '17:00';
  nStartTime: string = '18:00';
  nEndTime: string = '22:00';
  consultantTime: number = 30;
  doctorId!: any;
  description: string = 'Default description';
  force: boolean = true;
  type: string = 'bg-success-subtle';
  shiftName: any;

  selectedRangeDate!: {
    from: string;
    to: string;
  };

  selectedEvent: any;

  calendarOptions: CalendarOptions = {
    plugins: [
      dayGridPlugin,
      listPlugin,
      interactionPlugin,
      timeGridPlugin,
      multiMonthPlugin,
    ],
    headerToolbar: {
      right: 'multiMonthYear,dayGridMonth,dayGridWeek,dayGridDay,listWeek',
      center: 'title',
      left: 'prev,next today',
    },
    initialView: 'multiMonthYear',
    initialEvents: this.calendarEvents,
    themeSystem: 'bootstrap',
    weekends: true,
    droppable: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    defaultAllDay: false,
    dayMaxEvents: true,
    direction: 'ltr',
    locale: 'en',
    select: this.openAddOrUpdateModal.bind(this),
    eventClick: this.openViewModal.bind(this),
    eventsSet: this.handleEvents.bind(this),
  };

  constructor(
    private _modalService: NgbModal,
    private formBuilder: FormBuilder,
    private router: Router,
    private _scheduleService: ScheduleService,
    private _toastService: ToastService,
    private _spinnerService: NgxSpinnerService
  ) {}

  ngOnDestroy(): void {
    if (this.addEvent$) {
      this.addEvent$.unsubscribe();
    }
    if (this.fetchEvent$) {
      this.fetchEvent$.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'Home' },
      { label: 'Schedule Management' },
      { label: 'Assign Schedule', active: true },
    ];

    const currentUrl = this.router.url;
    this.doctorId = currentUrl.substring(currentUrl.lastIndexOf('/') + 1);

    this.addEventFormGroup = this.formBuilder.group({
      description: new FormControl('Default description', {
        validators: [Validators.required],
      }),
      scheduleDate: ['', Validators.required],
      mStartTime: ['07:00'],
      mEndTime: ['11:00'],
      aStartTime: ['11:00'],
      aEndTime: ['17:00'],
      nStartTime: ['18:00'],
      nEndTime: ['22:00'],
      doctorId: [this.doctorId, Validators.required],
      consultantTime: [this.consultantTime, Validators.required],
      type: ['bg-success-subtle'],
      force: [true],
    });
    this.fetchEvent();
  }

  get formAddEventControl() {
    return this.addEventFormGroup.controls;
  }

  fetchEvent() {
    this.fetchEvent$ = this._scheduleService
      .getScheduleEvents(this.doctorId)
      .pipe(
        first(),
        catchError((err) => {
          console.log('cannot load schedule event: ' + err);
          return throwError(() => err);
        }),
        map((res) => {
          return (res = res.map((event: any) => {
            return {
              id: event.id,
              date: new Date(event.workingDay + ' ' + event.startTime),
              title:
                event.startTime.slice(0, 2) < 12
                  ? 'Morning Shift'
                  : event.startTime.slice(0, 2) < 18
                  ? 'Afternoon Shift'
                  : 'Night Shift',
              // title: event.description,
              start: new Date(event.workingDay + ' ' + event.startTime),
              end: new Date(event.workingDay + ' ' + event.endTime),
              allDay: false,
              className: event.type,
              description: event.description,
            };
          }));
        })
      )
      .subscribe((events) => {
        this.calendarEvents = events;
        this.updateCalendarEvents();
      });
  }

  updateCalendarEvents() {
    this.calendarOptions.initialEvents = this.calendarEvents;
  }

  openAddOrUpdateModal(events?: any) {
    //Fix error get next day of end date
    let to = events.endStr.split('-');
    if (to[to.length - 1] != 1) {
      to[to.length - 1] = to[to.length - 1] - 1;
      to[to.length - 1] =
        to[to.length - 1] < 10
          ? '0' + to[to.length - 1].toString()
          : to[to.length - 1].toString();
      to = to.join('-');
    } else {
      to = events.startStr;
    }

    const toDate = to;
    const rangeDate = {
      from: events.startStr,
      to: events.endStr,
    };

    this.selectedRangeDate = rangeDate;

    this.calendarApi = events;

    this._modalService.open(this.AddOrUpdateModal, {
      centered: true,
      size: 'xl',
    });
  }

  openViewModal(clickInfo: EventClickArg) {
    this.selectedEvent = {
      id: clickInfo.event._def.publicId,
      description: clickInfo.event._def.title,
      date: clickInfo.event.start?.toLocaleDateString(),
      start: clickInfo.event.start?.toLocaleTimeString().slice(0, 5),
      end: clickInfo.event.end?.toLocaleTimeString().slice(0, 5),
    };

    switch (true) {
      case this.selectedEvent.start.slice(0, 2) < '12':
        this.shiftName = 'Morning Shift';
        break;
      case this.selectedEvent.start.slice(0, 2) < '18':
        this.shiftName = 'Afternoon Shift';
        break;
      default:
        this.shiftName = 'Night Shift';
        break;
    }

    this._modalService.open(this.ViewModal, {
      centered: true,
      size: 'md',
    });
  }

  onSubmit() {
    this.submitted = true;
    this.formAddEventControl['scheduleDate'].setValue(
      this.selectedRangeDate.from + ' to ' + this.selectedRangeDate.to
    );

    if (this.addEventFormGroup.valid) {
      this.addEvent(this.addEventFormGroup.value);
    }
  }

  addEvent(data: any) {
    this.showSpinner();
    this.addEvent$ = this._scheduleService
      .addSchedule(data)
      .pipe(
        first(),
        catchError((err) => {
          this.hideSpinner();
          this.closeEventModal();
          this._toastService.error(
            'Add schedule failed. Please check your connection again'
          );
          return throwError(() => err);
        }),
        finalize(() => {
          this.closeEventModal();
          this.hideSpinner();
        })
      )
      .subscribe((res) => {
        this._toastService.success(res.message);
        this.hideSpinner();
        this.closeEventModal();
        if (this.fetchEvent$) {
          this.fetchEvent$.unsubscribe();
        }
        this.fetchEvent();
      });
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
  }

  handleEventClick(clickInfo: EventClickArg) {}

  scheduleDateChange(event: any) {
    const rangeDate = event.target.defaultValue.split(' to ');
    this.selectedRangeDate = {
      from: rangeDate[0],
      to: rangeDate[1],
    };
  }

  closeEventModal() {
    this._modalService.dismissAll();
  }

  showSpinner() {
    this._spinnerService.show();
  }

  hideSpinner() {
    this._spinnerService.hide();
  }
}
