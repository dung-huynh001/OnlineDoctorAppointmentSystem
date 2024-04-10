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
import { DataManager, UrlAdaptor } from '@syncfusion/ej2-data';
import {
  EventSettingsModel,
  GroupModel,
  ResourceDetails,
  View,
} from '@syncfusion/ej2-schedule';
import { environment } from '../../../../environments/environment';
import { ScheduleService } from '../../../core/services/schedule.service';
import { DatePipe } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { catchError, finalize, throwError } from 'rxjs';

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
  breadCrumbItems!: Array<{}>;

  headerOption = 'Date';
  type!: string;
  calendarValue!: string;
  calendarTitle: string = new Date().toDateString();

  selectedDate: Date = new Date();

  selectedView: View = 'TimelineDay';

  @ViewChild('scheduleObj') public scheduleObj!: ScheduleComponent;

  currentUser = this._authService.currentUser();

  public data: DataManager = new DataManager({
    url: environment.serverApi + '/api/Schedule/get-schedules-of-doctors',
    // crudUrl: environment.serverApi + '/api/Schedule/update-schedule',
    headers: [
      {
        Authorization: `Bearer ${this.currentUser.token}`,
      },
    ],
    adaptor: new UrlAdaptor(),
    crossDomain: true,
  });

  public doctorResources!: Record<string, any>[];

  public group: GroupModel = {
    enableCompactView: false,
    resources: ['Doctor'],
  };

  public allowMultiple = false;

  public eventSettings: EventSettingsModel = {
    dataSource: this.data,
    fields: {
      id: 'Id',
      subject: { name: 'Subject', title: 'Event Name' },
      location: { name: 'Location', title: 'Event Location' },
      description: { name: 'Description', title: 'Event Description' },
      startTime: { name: 'StartTime', title: 'Start Duration' },
      endTime: { name: 'EndTime', title: 'End Duration' },
    },
  };

  constructor(
    private datePipe: DatePipe,
    private _scheduleService: ScheduleService,
    private _authService: AuthService,
    private _spinnerService: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'Home' },
      { label: 'Appointment On Site', active: true },
    ];
    this.fetchDoctors();
    this.calendarTitle = new Date().toDateString();
  }

  ngAfterViewInit(): void {
    this.removeWarningLisenceEJ2();
  }

  fetchDoctors() {
    this._spinnerService.show();
    this._scheduleService
      .getDoctors('Schedule/get-doctors')
      .pipe(
        catchError((err) => {
          console.log(err);
          return throwError(() => err);
        }),
        finalize(() => {
          setTimeout(() => {
            this._spinnerService.hide();
          }, 300);
        })
      )
      .subscribe((res) => {
        this.doctorResources = res.map((doctor: any) => {
          return {
            FullName: doctor.fullName,
            Id: doctor.id,
            DepartmentId: doctor.departmentId,
            Designation: doctor.speciality,
            AvatarUrl: doctor.avatarUrl,
          };
        });
      });
  }

  currentViewChange(event: any) {
    if (event == 'TimelineDay') {
      this.headerOption = 'Hour';
    } else {
      this.headerOption = 'Date';
    }
  }

  formatDateHeader(value: Date) {
    return this.datePipe.transform(value, 'dd (EEE)');
  }

  removeWarningLisenceEJ2() {
    const timeOutId = setTimeout(() => {
      const afterDivs = document.querySelectorAll('.e-dlg-container');

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

  public getEmployeeName(value: ResourceDetails) {
    return value.resourceData[`${value.resource.textField}`] as string;
  }

  public getEmployeeDesignation(value: ResourceDetails) {
    return value.resourceData['Designation'];
  }

  public getEmployeeImageName(value: ResourceDetails) {
    return value.resourceData['AvatarUrl'];
  }
}
