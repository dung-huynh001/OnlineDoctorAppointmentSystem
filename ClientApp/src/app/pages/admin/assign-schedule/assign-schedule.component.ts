import { join } from 'node:path';
import multiMonthPlugin from '@fullcalendar/multimonth';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import dayGridPlugin from '@fullcalendar/daygrid';
import {
  AfterViewInit,
  Component,
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
import { calendarEvents } from '../../assign-schedule/data';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ScheduleService } from '../../../core/services/schedule.service';
import { catchError, throwError } from 'rxjs';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-assign-schedule',
  templateUrl: './assign-schedule.component.html',
  styleUrl: './assign-schedule.component.scss',
})
export class AssignScheduleComponent implements OnInit, AfterViewInit {
  breadCrumbItems!: Array<{}>;
  calendarEvents!: EventInput[];
  currentEvents: EventApi[] = [];
  formAddEvent!: FormGroup;
  submitted: boolean = false;
  @ViewChild('AddOrUpdateModal') AddOrUpdateModal!: TemplateRef<any>;
  mStartTime: string = '07:00';
  mEndTime: string = '11:00';
  aStartTime: string = '13:00';
  aEndTime: string = '17:00';
  nStartTime: string = '18:00';
  nEndTime: string = '22:00';
  consultantTime: number = 30;
  doctorId!: any;
  description: string = 'Default description';

  selectedRangeDate!: {
    from: string;
    to: string;
  };

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
    initialEvents: this.calendarEvents || calendarEvents,
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
    select: this.openModal.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),
  };

  constructor(
    private _modalService: NgbModal,
    private formBuilder: FormBuilder,
    private router: Router,
    private _scheduleService: ScheduleService,
    private _toastService: ToastService
  ) {}
  ngAfterViewInit(): void {}

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'Home' },
      { label: 'Schedule Management' },
      { label: 'Assign Schedule', active: true },
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
    });
  }

  get formAddEventControl() {
    return this.formAddEvent.controls;
  }

  openModal(events?: any) {
    //Fix error get next day of end date
    const to = events.endStr.split('-');
    to[to.length - 1] = to[to.length - 1] - 1;
    to[to.length - 1] =
      to[to.length - 1] < 10
        ? '0' + to[to.length - 1].toString()
        : to[to.length - 1].toString();
    const rangeDate = {
      from: events.startStr,
      to: to.join('-'),
    };

    this.selectedRangeDate = rangeDate;

    this._modalService.open(this.AddOrUpdateModal, {
      centered: true,
      size: 'xl',
    });
  }

  onSubmit() {
    this.submitted = true;
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
    if (this.formAddEvent.valid) {
      console.log(this.formAddEvent.value);
      this._scheduleService
        .addSchedule('/Schedule/add-schedule', this.formAddEvent.value)
        .pipe(
          catchError((err) => {
            return throwError(() => err);
          }))
        .subscribe((res) => {
          this._toastService.success(res.message);
        });
    }
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
}
