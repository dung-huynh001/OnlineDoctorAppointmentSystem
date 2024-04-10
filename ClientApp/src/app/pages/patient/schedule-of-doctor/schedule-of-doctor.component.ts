import { environment } from './../../../../environments/environment';
// import  multiMonthPlugin from '@fullcalendar/multimonth';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import {
  Component,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription, catchError, first, map, throwError } from 'rxjs';

import {
  CalendarOptions,
  EventApi,
  EventClickArg,
  EventInput,
} from '@fullcalendar/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { ToastService } from '../../../core/services/toast.service';
import { ScheduleService } from '../../../core/services/schedule.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-schedule-of-doctor',
  templateUrl: './schedule-of-doctor.component.html',
  styleUrl: './schedule-of-doctor.component.scss',
})
export class ScheduleOfDoctorComponent implements OnInit, OnDestroy {
  private addEvent$!: Subscription;
  private fetchEvent$!: Subscription;
  breadCrumbItems!: Array<{}>;

  private hostName = environment.serverApi;

  calendarEvents!: EventInit[];
  currentEvents: EventApi[] = [];
  calendarApi: any;

  formAddEvent!: FormGroup;
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

  selectedEvent!: {
    id: any;
    title: string;
    date?: string;
    shifts: {
      shiftName: string;
      start: string;
      end: string;
      description: string;
      appt: any;
    }[]
  };

  calendarOptions: CalendarOptions = {
    plugins: [
      dayGridPlugin,
      interactionPlugin,
      timeGridPlugin,
    ],
    headerToolbar: {
      right: 'dayGridMonth,dayGridWeek,dayGridDay',
      center: 'title',
      left: 'prev,next today',
    },
    initialView: 'dayGridMonth',
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
    eventContent: this.reRenderEventContent,
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),
  };

  constructor(
    private _modalService: NgbModal,
    private formBuilder: FormBuilder,
    private router: Router,
    private _scheduleService: ScheduleService,
    private _toastService: ToastService,
    private _spinnerService: NgxSpinnerService
  ) { }

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
      { label: 'Schedules Of Doctors', active: true },
    ];

    const currentUrl = this.router.url;
    this.doctorId = currentUrl.substring(currentUrl.lastIndexOf('/') + 1);

    this.formAddEvent = this.formBuilder.group({
      description: [this.description, Validators.required],
      scheduleDate: ['', Validators.required],
      mStartTime: [''],
      mEndTime: [''],
      aStartTime: [''],
      aEndTime: [''],
      nStartTime: [''],
      nEndTime: [''],
      doctorId: [this.doctorId, Validators.required],
      consultantTime: [this.consultantTime, Validators.required],
      type: ['bg-success-subtle'],
      force: [true],
    });
    this.fetchEvent();
  }

  get formAddEventControl() {
    return this.formAddEvent.controls;
  }

  fetchEvent() {
    this.fetchEvent$ = this._scheduleService
      .getSchedulesOfDoctors('/Schedule/get-schedules-of-doctors')
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
              groupId: event.workingDay,
              date: new Date(event.workingDay),
              title: event.fullName,
              allDay: true,
              imageUrl: this.hostName + '/' + event.avatarUrl,
              className: event.type,
            };
          }));
        })
      )
      .subscribe((events: EventInit[]) => {
        this.calendarEvents = events;
        this.updateCalendarEvents();
      });
  }

  reRenderEventContent(eventInfo: EventClickArg, createEl: any): any {
    let innerHtml;
    let avatarUrl = eventInfo.event._def.extendedProps['imageUrl'];
    if (avatarUrl) {
      innerHtml = `<img class="avatar-xs rounded-circle" src=${avatarUrl} alt="doctor_avatar">` + eventInfo.event._def.title;
      return createEl = { html: `<div class="d-flex gap-2">${innerHtml}</div>` };
    }
  }

  updateCalendarEvents() {
    this.calendarOptions.initialEvents = this.calendarEvents;
  }

  handleEventClick(clickInfo: EventClickArg) {
    let date = clickInfo.event.start?.toLocaleDateString("en-CA");
    let doctorId = clickInfo.event._def.publicId;
    this._scheduleService.getScheduleShiftByDate('Schedule/get-schedule-shift-by-date', doctorId, date)
      .pipe(catchError(err => {
        console.log(err);
        return throwError(() => err);
      }))
      .subscribe(res => {
        this.selectedEvent = {
          id: clickInfo.event._def.publicId,
          title: clickInfo.event._def.title,
          date: clickInfo.event.start?.toLocaleDateString('en-GB'),
          shifts: res
      };
      });


    this._modalService.open(this.ViewModal, {
      centered: true,
      size: 'lg',
    });
  }

  onSubmit() {
    this.submitted = true;
    this.formAddEventControl['description'].setValue(this.description);
    this.formAddEventControl['scheduleDate'].setValue(
      this.selectedRangeDate.from + ' to ' + this.selectedRangeDate.to
    );
    this.formAddEventControl['mStartTime'].setValue(this.mStartTime);
    this.formAddEventControl['mEndTime'].setValue(this.mEndTime);
    this.formAddEventControl['aStartTime'].setValue(this.aStartTime);
    this.formAddEventControl['aEndTime'].setValue(this.aEndTime);
    this.formAddEventControl['nStartTime'].setValue(this.nStartTime);
    this.formAddEventControl['nEndTime'].setValue(this.nEndTime);
    this.formAddEventControl['consultantTime'].setValue(this.consultantTime);
    this.formAddEventControl['force'].setValue(this.force);
    this.formAddEventControl['type'].setValue(this.type);

    this.showSpinner();
    if (this.formAddEvent.valid) {
      this.addEvent(this.formAddEvent.value);
    }
  }

  addEvent(data: any) {
    this.addEvent$ = this._scheduleService
      .addSchedule('/Schedule/add-schedule', data)
      .pipe(
        first(),
        catchError((err) => {
          this.hideSpinner();
          this._toastService.error(
            'Add schedule failed. Please check your connection again'
          );
          return throwError(() => err);
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
