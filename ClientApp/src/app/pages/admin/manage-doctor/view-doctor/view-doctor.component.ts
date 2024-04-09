import { iDoctorDetails } from './../../../../core/models/doctor.model';
import { DoctorService } from './../../../../core/services/doctor.service';
import { AfterViewInit, Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { catchError, finalize, interval, map, throwError } from 'rxjs';

@Component({
  selector: 'app-view-doctor',
  templateUrl: './view-doctor.component.html',
  styleUrl: './view-doctor.component.scss',
})
export class ViewDoctorComponent implements OnInit, AfterViewInit {
  UpcomingActivities:
    | Array<{
        date?: string;
        day?: string;
        time?: string;
        content?: string;
        users: Array<{
          name?: string;
          profile?: string;
          variant?: string;
        }>;
      }>
    | undefined;
  breadCrumbItems!: Array<{}>;
  userType = localStorage.getItem('userType');

  doctorData: iDoctorDetails = {
    id: 0,
    userId: '',
    address: '',
    dateOfBirth: '',
    departmentId: '',
    departmentName: '',
    email: '',
    fullName: '',
    avatarUrl: '',
    gender: '',
    nationalId: '',
    phoneNumber: '',
    speciality: '',
    workingEndDate: '',
    workingStartDate: '',
    createdDate: '',
    updatedDate: '',
  };

  completionLevel!: number;
  selectedId!: any;
  selectedDate: Date = new Date();
  schedulesInfo!: Array<{
    shiftName: any;
    shiftTime: any;
    breakTime: any;
    description: string;
    appt: number;
  }>;
  totalApptOnDate: number = 0;

  constructor(
    private _doctorService: DoctorService,
    private router: Router,
    private _spinnerService: NgxSpinnerService
  ) {
    this.completionLevel = 30;
  }
  ngAfterViewInit(): void {}

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'Home' },
      { label: 'Doctor Management' },
      { label: 'Doctor Details', active: true },
    ];

    const currentUrl = this.router.url;
    this.selectedId = currentUrl.substring(currentUrl.lastIndexOf('/') + 1);

    this.fetchData();
    this.getScheduleByDate();

    this.UpcomingActivities = [
      {
        date: '25',
        day: 'Tue',
        time: '12:00am - 03:30pm',
        content: 'Meeting for campaign with sales team',
        users: [
          {
            name: 'Stine Nielsen',
            profile: 'assets/images/users/avatar-1.jpg',
          },
          {
            name: 'Jansh Brown',
            profile: 'assets/images/users/avatar-2.jpg',
          },
          {
            name: 'Dan Gibson',
            profile: 'assets/images/users/avatar-3.jpg',
          },
          {
            name: '5',
            variant: 'bg-info',
          },
        ],
      },
      {
        date: '20',
        day: 'Wed',
        time: '02:00pm - 03:45pm',
        content: 'Adding a new event with attachments',
        users: [
          {
            name: 'Frida Bang',
            profile: 'assets/images/users/avatar-4.jpg',
          },
          {
            name: 'Malou Silva',
            profile: 'assets/images/users/avatar-5.jpg',
          },
          {
            name: 'Simon Schmidt',
            profile: 'assets/images/users/avatar-6.jpg',
          },
          {
            name: 'Tosh Jessen',
            profile: 'assets/images/users/avatar-7.jpg',
          },
          {
            name: '3',
            variant: 'bg-success',
          },
        ],
      },
      {
        date: '17',
        day: 'Wed',
        time: '04:30pm - 07:15pm',
        content: 'Create new project Bundling Product',
        users: [
          {
            name: 'Nina Schmidt',
            profile: 'assets/images/users/avatar-8.jpg',
          },
          {
            name: 'Stine Nielsen',
            profile: 'assets/images/users/avatar-1.jpg',
          },
          {
            name: 'Jansh Brown',
            profile: 'assets/images/users/avatar-2.jpg',
          },
          {
            name: '4',
            variant: 'bg-primary',
          },
        ],
      },
      {
        date: '12',
        day: 'Tue',
        time: '10:30am - 01:15pm',
        content: 'Weekly closed sales won checking with sales team',
        users: [
          {
            name: 'Stine Nielsen',
            profile: 'assets/images/users/avatar-1.jpg',
          },
          {
            name: 'Jansh Brown',
            profile: 'assets/images/users/avatar-5.jpg',
          },
          {
            name: 'Dan Gibson',
            profile: 'assets/images/users/avatar-2.jpg',
          },
          {
            name: '9',
            variant: 'bg-warning',
          },
        ],
      },
    ];
  }

  fetchData() {
    this._spinnerService.show();
    this._doctorService
      .getDoctorDetails('Doctor/get-doctor-details', this.selectedId)
      .pipe(
        map((res): iDoctorDetails => {
          return {
            id: res.id,
            userId: res.userId,
            address: res.address,
            dateOfBirth: res.dateOfBirth,
            departmentId: res.departmentId,
            departmentName: res.departmentName,
            email: res.email,
            fullName: res.fullName,
            avatarUrl: res.avatarUrl,
            gender:
              res.gender === 0 ? 'Male' : res.gender === 1 ? 'Female' : 'Other',
            nationalId: res.nationalId,
            phoneNumber: res.phoneNumber,
            speciality: res.speciality,
            workingEndDate: res.workingEndDate,
            workingStartDate: res.workingStartDate,
            createdDate: res.createdDate,
            updatedDate: res.updatedDate,
          };
        }),
        catchError((err) => {
          this.router.navigate(['/pages/page-not-found']);
          return throwError(() => err);
        }),
        finalize(() => {
          this._spinnerService.hide();
        })
      )
      .subscribe((res) => {
        this.doctorData = res;
      });
  }

  onChangeDate(event: any) {
    this.selectedDate = new Date(event.target.value);
    this.getScheduleByDate();
  }

  getScheduleByDate() {
    this._doctorService
      .getScheduleByDate(
        'Schedule/get-schedule-by-date',
        this.selectedId,
        this.selectedDate.toLocaleDateString('en-CA')
      )
      .pipe(
        map((res) => {
          return (res = res.map((schedule: any) => ({
            shiftTime: schedule.start,
            breakTime: schedule.end,
            description: schedule.description,
            shiftName: schedule.shiftName,
            appt: schedule.appt,
          })));
        }),
        catchError((err) => {
          return throwError(() => err);
        })
      )
      .subscribe((res) => {
        if (res.length) {
          this.schedulesInfo = res;
          this.totalApptOnDate = this.schedulesInfo.reduce(
            (total, s) => total + s.appt,
            0
          );
        } else {
          this.schedulesInfo = [];
          this.totalApptOnDate = 0;
        }
      });
  }

  getDate(): number {
    return this.selectedDate.getDate();
  }
}
