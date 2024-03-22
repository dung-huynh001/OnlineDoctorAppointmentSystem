import { iDoctorOnDuty } from './../../../core/models/doctorOnDuty.model';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import {
  Observable,
  Subject,
  catchError,
  debounceTime,
  distinctUntilChanged,
  finalize,
  map,
  of,
  switchMap,
  throwError,
} from 'rxjs';
import { ToastService } from '../../../core/services/toast.service';
import { AppointmentService } from '../../../core/services/appointment.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-make-appointment',
  templateUrl: './make-appointment.component.html',
  styleUrl: './make-appointment.component.scss',
})
export class MakeAppointmentComponent implements OnInit {
  breadcrumbItems!: Array<{}>;
  workingDay!: string;
  workingTime!: string;

  doctorData!: Array<iDoctorOnDuty>;
  selectedDoctor!: iDoctorOnDuty;
  foundFlag: boolean = false;

  searchValue: any;
  private searchValue$ = new Subject<string>();
  searchResults!: Array<iDoctorOnDuty>;

  @ViewChild('content') abc!: TemplateRef<any>;

  defaultData!: {
    doctorId: number;
    scheduleId: number;
    doctorName: string;
    speciality: string;
  };

  constructor(
    private _toastService: ToastService,
    private _appointmentService: AppointmentService,
    private _spinnerService: NgxSpinnerService,
    private _modalService: NgbModal,
    private _authService: AuthService
  ) {
    this.defaultData = {
      doctorId: 1,
      scheduleId: 1,
      doctorName: '',
      speciality: '',
    };

    this.searchValue$
      .pipe(
        debounceTime(200),
        distinctUntilChanged(),
        switchMap((term: string) => {
          return this.search(term);
        })
      )
      .subscribe((results) => {
        this.searchResults = results;
      });
  }

  ngOnInit(): void {
    this.breadcrumbItems = [
      { label: 'Home' },
      { label: 'Make Appointment', active: true },
    ];
    this.workingDay = new Date().toLocaleDateString('en-ZA');
    this.workingTime = new Date().toLocaleTimeString('en-ZA');

    const currentUser = this._authService.currentUser();
    if (currentUser.status == 0) {
      this._modalService.open(this.abc);
    }
  }

  onDateChange(workingDate: string) {
    this.workingDay = workingDate;
  }

  onTimeChange(time: string) {
    this.workingTime = time;
  }

  getScheduleDateTime() {
    const date = new Date(
      this.workingDay + ' ' + this.workingTime
    ).toLocaleString('en-US', { timeZone: 'Asia/Ho_Chi_Minh' });
    return date;
  }

  search(term: string): Observable<any[]> {
    return of(
      this.doctorData.filter(
        (item) =>
          item.fullName.toLowerCase().includes(term.toLowerCase()) ||
          item.speciality.toLowerCase().includes(term.toLowerCase())
      )
    );
  }

  searchInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.searchValue$.next(inputElement.value);
  }

  getDoctorsOnDuty() {
    this.foundFlag = true;
    const date = this.getScheduleDateTime();
    this._spinnerService.show();
    this._appointmentService
      .getDoctorOnDuty('/Doctor/get-doctor-on-duty', date)
      .pipe(
        map((res): Array<iDoctorOnDuty> => {
          return res.map((data: any) => ({
            doctorId: data.doctorId,
            fullName: data.fullName,
            scheduleId: data.scheduleId,
            speciality: data.speciality,
          }));
        }),
        catchError((err) => {
          console.log(err);
          return throwError(() => err);
        }),
        finalize(() => {
          setTimeout(() => {
            this._spinnerService.hide();
          }, 200);
        })
      )
      .subscribe((doctors) => {
        this.doctorData = doctors;
        this.searchResults = doctors;
      });
  }

  onSelect(doctor: iDoctorOnDuty) {
    this.defaultData = {
      doctorId: doctor.doctorId,
      doctorName: doctor.fullName,
      scheduleId: doctor.scheduleId,
      speciality: doctor.speciality,
    };
  }
}
