import {
  Component,
  OnInit,
} from '@angular/core';
import { link } from 'fs';

@Component({
  selector: 'app-cancelled',
  templateUrl: './cancelled.component.html',
  styleUrl: './cancelled.component.scss'
})
export class CancelledComponent implements OnInit {
  breadCrumbItems!: Array<{}>
  title: string = "Cancelled Appointments";
  appointmentStatus: string = "cancelled";

  constructor() {}
  
  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'Manage Appointment', link: '/admin/appointment/all'},
      { label: 'Cancelled', active: true },
    ];
  }
}