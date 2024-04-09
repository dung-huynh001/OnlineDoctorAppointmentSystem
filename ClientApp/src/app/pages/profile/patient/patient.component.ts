import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrl: './patient.component.scss',
})
export class PatientComponent implements OnInit {
  breadCrumbItems!: Array<{}>;
  userType = localStorage.getItem('userType');
  completionLevel!: number;
  constructor() {
    this.completionLevel = 30;
  }

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'Menu' },
      { label: 'Profile', active: true },
    ];
  }
}
