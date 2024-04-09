import {
  AfterViewInit,
  Component,
  OnInit,
  Renderer2,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { Subject, catchError, finalize, throwError } from 'rxjs';
import { AppointmentService } from '../../../../core/services/appointment.service';
import { AuthService } from '../../../../core/services/auth.service';
import { User } from '../../../../core/models/auth.models';
import { DatePipe } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from '../../../../core/services/toast.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrl: './all.component.scss'
})
export class AllComponent  implements OnInit {
  breadCrumbItems!: Array<{}>
  title: string = "Appointments";
  appointmentStatus: string = "all";

  constructor() {}
  
  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'Home' },
      { label: 'Manage Appointment' },
      { label: 'All', active: true },
    ];
  }
}
