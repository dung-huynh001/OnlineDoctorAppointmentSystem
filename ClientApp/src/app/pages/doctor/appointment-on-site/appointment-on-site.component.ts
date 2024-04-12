import {
  AfterViewInit,
  Component,
  DoCheck,
  ElementRef,
  Input,
  OnInit,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import {
  NgbOffcanvas,
  NgbOffcanvasConfig,
  OffcanvasDismissReasons,
} from '@ng-bootstrap/ng-bootstrap';
import {
  DayService,
  DragAndDropService,
  MonthService,
  ResizeService,
  ScheduleComponent,
  TimelineMonthService,
  TimelineViewsService,
  TimelineYearService,
  WeekService,
} from '@syncfusion/ej2-angular-schedule';
import {
  DataManager,
  Predicate,
  Query,
  UrlAdaptor,
} from '@syncfusion/ej2-data';
import {
  CellClickEventArgs,
  EventClickArgs,
  EventSettingsModel,
  GroupModel,
  PopupOpenEventArgs,
  RenderCellEventArgs,
  ResourceDetails,
  View,
} from '@syncfusion/ej2-schedule';
import { environment } from '../../../../environments/environment';
import { ScheduleService } from '../../../core/services/schedule.service';
import { DatePipe } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { catchError, finalize, throwError } from 'rxjs';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
import { ChangeEventArgs } from '@syncfusion/ej2-calendars';
import { AppointmentService } from '../../../core/services/appointment.service';
import { FilteringEventArgs } from '@syncfusion/ej2-dropdowns';

@Component({
  selector: 'app-appointment-on-site',
  templateUrl: './appointment-on-site.component.html',
  styleUrl: './appointment-on-site.component.scss',
  encapsulation: ViewEncapsulation.None,
  providers: [
    DayService,
    MonthService,
    WeekService,
    TimelineViewsService,
    TimelineMonthService,
    TimelineYearService,
    ResizeService,
    DragAndDropService,
  ],
})
export class AppointmentOnSiteComponent implements OnInit, AfterViewInit {
  // Test Editor Customize
  startDate!: Date;
  endDate!: Date;
  fields = {
    text: 'fullName',
    value: 'id',
  };
  patients!: Array<{
    id: number;
    fullName: string;
  }>;
  selectedPatient!: {
    id: number;
    fullName: string;
  };

  // startDateParser(data: string) {
  //   if (isNullOrUndefined(this.startDate) && !isNullOrUndefined(data)) {
  //     return new Date(data);
  //   } else if (!isNullOrUndefined(this.startDate)) {
  //     return new Date(this.startDate);
  //   }
  //   return new Date();
  // }

  // endDateParser(data: string) {
  //   if (isNullOrUndefined(this.endDate) && !isNullOrUndefined(data)) {
  //     return new Date(data);
  //   } else if (!isNullOrUndefined(this.endDate)) {
  //     return new Date(this.endDate);
  //   }
  //   return new Date();
  // }

  
  appointmentDateParser(data: string) {
    if (isNullOrUndefined(this.startDate) && !isNullOrUndefined(data)) {
      return new Date(data);
    } else if (!isNullOrUndefined(this.startDate)) {
      return new Date(this.startDate);
    }
    return new Date();
  }


  onDateChange(args: any): void {
    if (!isNullOrUndefined(args.event as any)) {
      if (args.element.id === 'StartTime') {
        this.startDate = args.value as Date;
      } else if (args.element.id === 'EndTime') {
        this.endDate = args.value as Date;
      }
    }
  }

  popupOpen(event: PopupOpenEventArgs) {
    console.log(event);
    this._appointmentService
      .getAllPatientToFillDropdown('Appointment/get-patients-to-fill-dropdown')
      .pipe(
        catchError((err) => {
          console.log(err);
          return throwError(() => err);
        })
      )
      .subscribe((res: any) => {
        this.patients = res;
        if (event.type == 'Editor') {
          this.selectedPatient = this.patients.find(
            (patient) => patient.id == event.data?.['PatientId']
          )!;
        }
      });
  }

  onFilteringPatient(event: FilteringEventArgs) {
    const searchValue = event.text;
    let query = new Query();
    query =
      searchValue != ''
        ? query.where('fullName', 'contains', searchValue, true)
        : query;
    event.updateData(this.patients, query);
  }

  eventDoubleClick(event: EventClickArgs) {
    console.log(event)
  }

  cellClick(event: CellClickEventArgs) {
    console.log(event);
    const startTime = event.startTime;
  }

  // End Test Editor Customize

  breadCrumbItems!: Array<{}>;

  headerOption = 'Date';
  type!: string;
  calendarValue!: string;
  calendarTitle: string = new Date().toDateString();

  selectedDate: Date = new Date();

  selectedView: View = 'TimelineDay';

  @ViewChild('scheduleObj') scheduleObj!: ScheduleComponent;

  currentUser = this._authService.currentUser();

  data: DataManager = new DataManager({
    url:
      environment.serverApi +
      '/api/Appointment/get-appointment-event-by-doctor',
    crudUrl: environment.serverApi + '/api/Appointment/add-or-update-appointment-event',
    headers: [
      {
        Authorization: `Bearer ${this.currentUser.token}`,
      },
    ],
    adaptor: new UrlAdaptor(),
    crossDomain: true,
  });

  eventSettings: EventSettingsModel = {
    dataSource: this.data,
    fields: {},
  };

  constructor(
    private datePipe: DatePipe,
    private _scheduleService: ScheduleService,
    private _authService: AuthService,
    private _spinnerService: NgxSpinnerService,
    private _appointmentService: AppointmentService
  ) {}

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'Home' },
      { label: 'Appointment On Site', active: true },
    ];
    this.calendarTitle = new Date().toDateString();
    this.type = 'day';
  }

  ngAfterViewInit(): void {
    this.removeWarningLisenceEJ2();
  }

  currentViewChange(event: any) {
    if (event == 'TimelineDay') {
      this.headerOption = 'Hour';
    } else {
      this.headerOption = 'Date';
    }

    setTimeout(() => {
      const headerCells = document.querySelectorAll(
        '.e-schedule .e-timeline-month-view .e-header-cells'
      );

      headerCells.forEach((cell) => {
        const innerText = cell.textContent;
        cell.classList.add(
          innerText?.includes('Sun')
            ? 'sun'
            : innerText?.includes('Sat')
            ? 'sat'
            : 'nor'
        );
      });
    }, 100);
  }

  renderCell(event: RenderCellEventArgs) {
    const eventDateStr = event.date?.toDateString();
    if (this.type != 'day') {
      event.element.classList.add(
        eventDateStr?.includes('Sun')
          ? 'sun'
          : eventDateStr?.includes('Sat')
          ? 'sat'
          : 'nor'
      );
    }
  }

  formatDateHeader(value: Date) {
    return {
      date: this.datePipe.transform(value, 'dd'),
      dayOfWeek: this.datePipe.transform(value, '(EEE)'),
    };
  }

  removeWarningLisenceEJ2() {
    const timeOutId = setTimeout(() => {
      const afterDivs = document.querySelectorAll(
        '.flatpickr-calendar.animate'
      );

      afterDivs?.forEach((element) => {
        const targetDiv = element.previousElementSibling;
        if (targetDiv && this.matchesStyle(targetDiv)) {
          targetDiv?.remove();
          clearTimeout(timeOutId);
        }
      });
    }, 200);
  }

  matchesStyle(element: Element) {
    const computedStyle = window.getComputedStyle(element);
    const firstChild = element.firstElementChild;
    const computedStyleFirstChild = window.getComputedStyle(firstChild!);
    return (
      (computedStyle.position === 'fixed' && computedStyle.top === '10px') ||
      computedStyleFirstChild.position === 'fixed'
    );
  }

  onChangeDate(event: any) {
    const date = new Date(event.dateString);
    switch (this.type.toLowerCase()) {
      case 'day':
        this.initForDay(date);
        break;
      case 'week':
        this.initForWeek(date);
        break;
      case 'half-month':
        this.initForHalfMonth(date);
        break;
      default:
        this.initForMonth(date);
        break;
    }

    this.selectedDate = new Date(this.calendarTitle.split('-')[0]);
  }

  next() {
    switch (this.type.toLowerCase()) {
      case 'day':
        this.nextDay();
        break;
      case 'week':
        this.nextWeek();
        break;
      case 'half-month':
        this.nextHalfMonth();
        break;
      case 'month':
        this.nextMonth();
        break;
      default:
        this.nextDay();
        break;
    }
    this.selectedDate = new Date(this.calendarTitle.split('-')[0]);
  }
  previous() {
    switch (this.type.toLowerCase()) {
      case 'day':
        this.previousDay();
        break;
      case 'week':
        this.previousWeek();
        break;
      case 'half-month':
        this.previousHalfMonth();
        break;
      case 'month':
        this.previousMonth();
        break;
      default:
        this.previousDay();
        break;
    }
    this.selectedDate = new Date(this.calendarTitle.split('-')[0]);
  }

  nextDay() {
    const date = new Date(Date.parse(this.calendarTitle));
    date.setDate(date.getDate() + 1);
    this.calendarTitle = date.toDateString();
  }

  previousDay() {
    const date = new Date(Date.parse(this.calendarTitle));
    date.setDate(date.getDate() - 1);
    this.calendarTitle = date.toDateString();
  }

  nextWeek() {
    const date = new Date(Date.parse(this.calendarTitle.slice(14)));
    date.setDate(date.getDate() + 1);
    const endOfWeek = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() + 6
    );
    this.calendarTitle =
      date.toDateString().slice(3) + ' - ' + endOfWeek.toDateString().slice(3);
  }

  previousWeek() {
    const date = new Date(Date.parse(this.calendarTitle.slice(0, 13)));
    const startOfWeek = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() - 7
    );
    const endOfWeek = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() - 1
    );
    this.calendarTitle =
      startOfWeek.toDateString().slice(3) +
      ' - ' +
      endOfWeek.toDateString().slice(3);
  }

  nextMonth() {
    const calendarTitle = this.calendarTitle.trim().replace(' ', ' 01 ');
    const date = new Date(Date.parse(calendarTitle));
    this.calendarTitle = new Date(date.getFullYear(), date.getMonth() + 1, 1)
      .toDateString()
      .slice(3)
      .replace('01', '');
  }

  previousMonth() {
    const calendarTitle = this.calendarTitle.trim().replace(' ', ' 01 ');
    const date = new Date(Date.parse(calendarTitle));
    this.calendarTitle = new Date(date.getFullYear(), date.getMonth() - 1, 1)
      .toDateString()
      .slice(3)
      .replace('01', '');
  }

  nextHalfMonth() {
    const date = new Date(Date.parse(this.calendarTitle.slice(14)));

    const startOfHalfMonth = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() + 1
    );

    const endOfHalfMonth = new Date(
      startOfHalfMonth.getFullYear(),
      startOfHalfMonth.getMonth(),
      startOfHalfMonth.getDate() + 13
    );
    this.calendarTitle =
      startOfHalfMonth.toDateString().slice(3) +
      ' - ' +
      endOfHalfMonth.toDateString().slice(3);
  }

  previousHalfMonth() {
    const date = new Date(Date.parse(this.calendarTitle.slice(0, 13)));

    const endOfHalfMonth = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() - 1
    );

    const startOfHalfMonth = new Date(
      endOfHalfMonth.getFullYear(),
      endOfHalfMonth.getMonth(),
      endOfHalfMonth.getDate() - 13
    );

    this.calendarTitle =
      startOfHalfMonth.toDateString().slice(3) +
      ' - ' +
      endOfHalfMonth.toDateString().slice(3);
  }

  initForDay(date?: Date | undefined) {
    this.selectedView = 'TimelineDay';
    date = date ? date : new Date();

    this.calendarTitle = date.toDateString();
    this.type = 'day';
  }

  initForWeek(date?: Date | undefined) {
    this.selectedView = 'TimelineWeek';

    date = date ? date : new Date();

    const weekday = date.getDay();

    const firstDayOfWeek = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() - weekday
    );

    const endOfWeek = new Date(
      firstDayOfWeek.getFullYear(),
      firstDayOfWeek.getMonth(),
      firstDayOfWeek.getDate() + 6
    );

    this.calendarTitle =
      firstDayOfWeek.toDateString().slice(3) +
      ' - ' +
      endOfWeek.toDateString().slice(3);
    this.type = 'week';
  }

  initForMonth(date?: Date | undefined) {
    this.selectedView = 'TimelineMonth';

    date = date ? date : new Date();
    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    this.calendarTitle = firstDayOfMonth.toDateString().slice(3);
    this.calendarTitle = this.calendarTitle.replace('01', '');
    this.type = 'month';
  }

  initForHalfMonth(date?: Date | undefined) {
    this.scheduleObj.changeView('TimelineWeek', undefined, undefined, 2);

    date = date ? date : new Date();

    const weekday = date.getDay();

    const firstDayOfWeek = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() - weekday
    );

    const endOfWeek = new Date(
      firstDayOfWeek.getFullYear(),
      firstDayOfWeek.getMonth(),
      firstDayOfWeek.getDate() + 13
    );

    this.calendarTitle =
      firstDayOfWeek.toDateString().slice(3) +
      ' - ' +
      endOfWeek.toDateString().slice(3);
    this.type = 'half-month';
  }
}
