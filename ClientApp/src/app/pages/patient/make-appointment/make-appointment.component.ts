import { iDoctorOnDuty } from './../../../core/models/doctorOnDuty.model';
import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
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
import { User } from '../../../core/models/auth.models';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-make-appointment',
  templateUrl: './make-appointment.component.html',
  styleUrl: './make-appointment.component.scss',
})
export class MakeAppointmentComponent implements OnInit, AfterViewInit {
  breadcrumbItems!: Array<{}>;
  workingDay!: string;
  workingTime!: string;
  userData!: User;
  hostName: string = environment.serverApi;

  doctorData!: Array<iDoctorOnDuty>;
  selectedDoctor!: iDoctorOnDuty;
  foundFlag: boolean = false;

  @ViewChild('content') content!: TemplateRef<any>;

  closeResult = '';

  searchValue: any;
  private searchValue$ = new Subject<string>();
  searchResults!: Array<iDoctorOnDuty>;

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
    private _authService: AuthService,
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
  ngAfterViewInit(): void {
    this._authService.getStatus().subscribe(status => {
      if (status == 0 || status == 1) {
        this.openWarningModal(this.content);
      }
    });


  }

  ngOnInit(): void {
    this.breadcrumbItems = [
      { label: 'Home' },
      { label: 'Make Appointment', active: true },
    ];
    this.workingDay = new Date().toLocaleDateString('en-ZA');
    this.workingTime = new Date().toLocaleTimeString('en-ZA');

    this.userData = this._authService.currentUser();
    
  }

  openWarningModal(content: TemplateRef<any>) {
    this._modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        () => {},
        () => {
          this.openWarningModal(content);
        }
      );
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
            avatarUrl: this.hostName + `/` + data?.avatarUrl,
            doctorId: data?.doctorId,
            fullName: data?.fullName,
            scheduleId: data?.scheduleId,
            speciality: data?.speciality,
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
