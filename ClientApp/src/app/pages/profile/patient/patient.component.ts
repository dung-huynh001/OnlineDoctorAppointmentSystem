import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrl: './patient.component.scss',
})
export class PatientComponent implements OnInit {
  breadCrumbItems!: Array<{}>;

  constructor() {}

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'Menu' },
      { label: 'Profile', active: true },
    ];
  }
}
