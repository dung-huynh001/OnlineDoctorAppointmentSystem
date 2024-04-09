import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pending',
  templateUrl: './pending.component.html',
  styleUrl: './pending.component.scss'
})
export class PendingComponent implements OnInit {
  breadCrumbItems!: Array<{}>
  title: string = "Pending Appointments";
  appointmentStatus: string = "pending";

  constructor() {}
  
  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'Home' },
      { label: 'Manage Appointment' },
      { label: 'Pending', active: true },
    ];
  }
}