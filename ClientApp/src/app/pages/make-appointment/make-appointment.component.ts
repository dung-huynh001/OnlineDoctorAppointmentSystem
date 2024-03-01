import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-make-appointment',
  templateUrl: './make-appointment.component.html',
  styleUrl: './make-appointment.component.scss',
})
export class MakeAppointmentComponent implements OnInit {
  breadcrumbItems!: Array<{}>;

  constructor() {}

  ngOnInit(): void {
    this.breadcrumbItems = [
      { label: 'Menu' },
      { label: 'Make Appointment', active: true },
    ];
  }
}
