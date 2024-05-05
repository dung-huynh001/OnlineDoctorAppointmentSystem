import { Component, OnInit } from '@angular/core';

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
      
      { label: 'Manage Appointment' },
      { label: 'All', active: true },
    ];
  }
}