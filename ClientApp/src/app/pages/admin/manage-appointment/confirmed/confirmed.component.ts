import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-confirmed',
  templateUrl: './confirmed.component.html',
  styleUrls: ['./confirmed.component.scss']
})

export class ConfirmedComponent implements OnInit {
  breadCrumbItems!: Array<{}>
  title: string = "Confirmed Appointments";
  appointmentStatus: string = "confirmed";

  constructor() {}
  
  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'Home' },
      { label: 'Manage Appointment' },
      { label: 'Confirmed', active: true },
    ];
  }
}