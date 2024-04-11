import { catchError, filter, finalize, throwError } from 'rxjs';
import {
  Component,
  ViewEncapsulation,
  Inject,
  ViewChild,
  AfterViewInit,
  Input,
  OnChanges,
  SimpleChanges,
  OnInit,
} from '@angular/core';
import {
  EventSettingsModel,
  View,
  GroupModel,
  TimelineViewsService,
  TimelineMonthService,
  DayService,
  ResizeService,
  DragAndDropService,
  ResourceDetails,
  ScheduleComponent,
  MonthService,
  WeekService,
  TimelineYearService,
} from '@syncfusion/ej2-angular-schedule';
import { DataManager, UrlAdaptor } from '@syncfusion/ej2-data';

import { DatePipe } from '@angular/common';
import { environment } from '../../../../environments/environment';
import { ScheduleService } from '../../../core/services/schedule.service';
import { AuthService } from '../../../core/services/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
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
export class CalendarComponent implements OnInit, AfterViewInit, OnChanges {
  headerOption = 'Date';

  @Input() calendarTitle!: string;
  selectedDate: Date = new Date();

  @Input() currentView!: string;
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
    this.fetchDoctors();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.selectedDate = new Date(this.calendarTitle.split('-')[0]);

    if (changes['currentView']) {
      this._spinnerService.show();
      setTimeout(() => {
        switch (changes['currentView'].currentValue) {
          case 'day':
            this.scheduleObj?.changeView('TimelineDay');
            break;
          case 'week':
            this.scheduleObj?.changeView(
              'TimelineWeek',
              undefined,
              undefined,
              1
            );
            break;
          case 'half-month':
            this.scheduleObj?.changeView(
              'TimelineWeek',
              undefined,
              undefined,
              2
            );
            break;
          case 'month':
            this.scheduleObj?.changeView('TimelineMonth');
            break;
          default:
            this.scheduleObj?.changeView('TimelineMonth');
            break;
        }
        this._spinnerService.hide();
      }, 100);
    }
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
    return {
      date: this.datePipe.transform(value, 'dd'),
      dayOfWeek: this.datePipe.transform(value, '(EEE)'),
    };
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
