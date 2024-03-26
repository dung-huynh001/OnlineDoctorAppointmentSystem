import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-appointment',
  templateUrl: './view-appointment.component.html',
  styleUrl: './view-appointment.component.scss'
})
export class ViewAppointmentComponent implements OnInit{
  breadcrumbItems!: Array<{}>;
  defaultData = {
    doctorId: 1,
    scheduleId: 1,
    doctorName: '',
    speciality: '',
  };

  constructor() {}
  ngOnInit(): void {
    this.breadcrumbItems = [
      { label: 'Home' },
      { label: 'Make Appointment', active: true },
    ];
  }

}
