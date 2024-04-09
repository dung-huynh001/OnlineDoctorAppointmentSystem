import { Component, OnInit } from '@angular/core';

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
      { label: 'Home' },
      { label: 'Manage Appointment' },
      { label: 'Cancelled', active: true },
    ];
  }
}