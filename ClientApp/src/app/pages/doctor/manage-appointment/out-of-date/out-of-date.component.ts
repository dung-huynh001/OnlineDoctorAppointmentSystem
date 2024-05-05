import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-out-of-date',
  templateUrl: './out-of-date.component.html',
  styleUrl: './out-of-date.component.scss'
})
export class OutOfDateComponent implements OnInit {
  breadCrumbItems!: Array<{}>
  title: string = "Out of date";
  appointmentStatus: string = "out-of-date";

  constructor() {

  }

  ngOnInit(): void {
    this.breadCrumbItems = [
      
      { label: 'Appointment Management' },
      { label: 'Out Of Date', active: true }
    ]
  }
}