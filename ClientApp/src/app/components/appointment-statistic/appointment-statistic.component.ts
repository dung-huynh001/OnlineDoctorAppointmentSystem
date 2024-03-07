import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-appointment-statistic',
  templateUrl: './appointment-statistic.component.html',
  styleUrl: './appointment-statistic.component.scss'
})
export class AppointmentStatisticComponent implements OnInit {
  constructor() {}
  ngOnInit(): void {
    
  }

  showMessage() {
    alert("message")
  }
}
