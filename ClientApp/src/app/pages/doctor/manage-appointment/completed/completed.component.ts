import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-completed',
  templateUrl: './completed.component.html',
  styleUrl: './completed.component.scss'
})
export class CompletedComponent  implements OnInit {
  breadCrumbItems!: Array<{}>
  title: string = "Completed Appointments";
  appointmentStatus: string = "completed";

  constructor() {}
  
  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'Manage Appointment', link: '/doctor/appointment/all' },
      { label: 'Completed', active: true },
    ];
  }
}
