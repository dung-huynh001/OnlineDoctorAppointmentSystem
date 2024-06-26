import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-confirmed',
  templateUrl: './confirmed.component.html',
  styleUrl: './confirmed.component.scss'
})
export class ConfirmedComponent implements OnInit {
  breadCrumbItems!: Array<{}>
  title: string = "Confirmed Appointments";
  appointmentStatus: string = "confirmed";

  constructor() {}
  
  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'Manage Appointment', link: '/doctor/appointment/all' },
      { label: 'Confirmed', active: true },
    ];
  }
}