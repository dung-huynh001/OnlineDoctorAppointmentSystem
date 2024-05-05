import {
  AfterViewInit,
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
import { DataManager, Query, UrlAdaptor } from '@syncfusion/ej2-data';
import {
  ActionEventArgs,
  CellClickEventArgs,
  EventClickArgs,
  EventRenderedArgs,
  EventSettingsModel,
  GroupModel,
  PopupOpenEventArgs,
  RenderCellEventArgs,
  ResourceDetails,
  View,
} from '@syncfusion/ej2-schedule';
import { environment } from '../../../../environments/environment';
import { DatePipe } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { catchError, finalize, throwError, map } from 'rxjs';
import { AppointmentService } from '../../../core/services/appointment.service';
import { FilteringEventArgs } from '@syncfusion/ej2-dropdowns';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from '../../../core/services/toast.service';
import { ScheduleService } from '../../../core/services/schedule.service';
import { iPatientResource } from '../../../core/models/scheduler.model';

const HOSTNAME = environment.serverApi;

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

  HOSTNAME: string = HOSTNAME;

  type!: string;
  calendarValue!: string;
  calendarTitle: string = new Date().toDateString();
  displayHour: boolean = true;

  selectedDate: Date = new Date();

  selectedView: View = 'TimelineDay';

  addPatientFormGroup!: FormGroup;
  addPatientForm_submitted: boolean = false;

  patientResources!: Record<string, any>;
  public group: GroupModel = {
    enableCompactView: true,
    resources: ['Patients'],
  };

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

  isInvalid: boolean = false;

  editMode: boolean = false;

  @ViewChild('scheduleObj') scheduleObj!: ScheduleComponent;
  @ViewChild('addNewPatientModal') addNewPatientModal!: TemplateRef<any>;

  currentUser = this._authService.currentUser();

  data: DataManager = new DataManager({
    url:
      environment.serverApi +
      '/api/Appointment/get-appointment-event-by-doctor',
    crudUrl: environment.serverApi + '/api/Appointment/appointment-on-site',
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
  };

  constructor(
    private datePipe: DatePipe,
    private _authService: AuthService,
    private _spinnerService: NgxSpinnerService,
    private _appointmentService: AppointmentService,
    private _modalService: NgbModal,
    private formBuilder: FormBuilder,
    private _toastService: ToastService,
    private _scheduleService: ScheduleService
  ) {}

  ngOnInit(): void {
    this.breadCrumbItems = [
      
      { label: 'Appointment On Site', active: true },
    ];
    this.calendarTitle = new Date().toDateString();
    this.type = 'day';

    

    this.fetchPatients();
  }

  ngAfterViewInit(): void {
    this.removeWarningLicenseEJ2();
  }

  fetchPatients() {
    this._scheduleService
      .getAppointmentPatients(this.currentUser.id)
      .pipe(
        map((res) => {
          return res.map((item) => ({
            Id: item.id,
            FullName: item.fullName,
            DateOfBirth: item.dateOfBirth,
            Gender: item.gender,
            AvatarUrl: item.avatarUrl,
          }));
        })
      )
      .subscribe((res) => {
        if (res.length > 0) {
          this.patientResources = res;
        } else {
          this.patientResources = [{}];
        }
      });
  }

  getPatientInfo(value: ResourceDetails) {
    const dateOfBirth = new Date(value.resourceData['DateOfBirth']);
    const age = new Date().getFullYear() - dateOfBirth.getFullYear();
    const gender = value.resourceData['Gender'];
    return age >= 1 && age <= 120
      ? `(${gender}, ${age} yrs)`
      : `(${gender}, unknown)`;
  }

  currentViewChange(event: any) {
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

  showAddPatientModal() {
    this.addPatientFormGroup = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$'),
        ],
      ],
      fullName: ['', Validators.required],
      nationalId: ['', Validators.required],
      gender: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      address: ['', Validators.required],
    });
    this._modalService.open(this.addNewPatientModal, {
      centered: true,
      size: 'lg',
    });
  }

  closeModal() {
    this.resetForm();
    this._modalService.dismissAll();
  }


  addNewPatient() {
    this._spinnerService.show();
    this.addPatientForm_submitted = true;
    if (this.addPatientFormGroup.valid) {
      this._appointmentService
        .addNewPatient(this.addPatientFormGroup.value)
        .pipe(
          catchError((err) => {
            this._toastService.error(err.Message);
            return throwError(() => err);
          }),
          finalize(() => {
            setTimeout(() => {
              this._spinnerService.hide();
            }, 300);
          })
        )
        .subscribe((res) => {
          if (res.isSuccess) {
            this._toastService.success(res.message);
            this.resetForm();
          } else {
            this._toastService.error(res.message);
          }
        });
    }
  }

  resetForm() {
    this.addPatientForm_submitted = false;
    this.addPatientFormGroup.reset();
    this.addPatientFormGroup.controls['gender'].setValue('');
    this.addPatientFormGroup.markAsPristine();
    this.addPatientFormGroup.markAsUntouched();
  }

  setColor(eventType: string): string {
    let bgColor: string = '';
    switch (eventType.toLowerCase()) {
      case 'pending':
        bgColor = 'warning';
        break;
      case 'confirmed':
        bgColor = 'primary';
        break;
      case 'completed':
        bgColor = 'success';
        break;
      case 'cancelled':
        bgColor = 'danger';
        break;
      default:
        bgColor = 'light';
        break;
    }
    return bgColor;
  }

  popupOpen(event: PopupOpenEventArgs) {
    this._appointmentService
      .getPatientsToFillDropdown()
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

  onEventDoubleClick(event: EventClickArgs) {
    this.editMode = true;
  }

  onCellClick(event: CellClickEventArgs) {
    this.editMode = false;
  }

  onActionFailure(event: ActionEventArgs) {
    this._toastService.error(
      'There are no scheduled on the selected date time'
    );
  }

  onActionBegin(args: ActionEventArgs) {
    const requestType = args.requestType;
    if (requestType == 'eventCreate' || requestType == 'eventChange') {
      if (!this.selectedPatient) {
        this.isInvalid = true;
        args.cancel = true;
        this._toastService.error(
          'Please choose patient before make appointment'
        );
      } else {
        this.isInvalid = false;
      }
    }
  }

  onActionComplete(event: ActionEventArgs) {
    if (event.requestType == 'eventCreated') {
      this.scheduleObj.refreshEvents();
      this.fetchPatients();
    }
  }

  onEventRendered(args: EventRenderedArgs) {
    let status = args.data['AppointmentStatus'].toLowerCase();
    let el = args.element;
    switch (status) {
      case 'pending':
        el.classList.add('bg-warning');
        break;
      case 'confirmed':
        el.classList.add('bg-primary');
        break;
      case 'completed':
        el.classList.add('bg-success');
        break;
      case 'cancelled':
        el.classList.add('bg-danger');
        break;
      default:
        el.classList.add('bg-light');
        break;
    }
  }

  onRenderCell(event: RenderCellEventArgs) {
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

  removeWarningLicenseEJ2() {
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
    this.displayHour = true;
    this.scheduleObj.changeView('TimelineDay');

    date = date ? date : new Date();

    this.calendarTitle = date.toDateString();
    this.type = 'day';
  }

  initForWeek(date?: Date | undefined) {
    this.displayHour = false;

    this.scheduleObj.changeView('TimelineWeek', undefined, undefined, 1);

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
    this.displayHour = false;
    this.scheduleObj.changeView('TimelineMonth');

    date = date ? date : new Date();
    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    this.calendarTitle = firstDayOfMonth.toDateString().slice(3);
    this.calendarTitle = this.calendarTitle.replace('01', '');
    this.type = 'month';
  }

  initForHalfMonth(date?: Date | undefined) {
    this.displayHour = false;
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
