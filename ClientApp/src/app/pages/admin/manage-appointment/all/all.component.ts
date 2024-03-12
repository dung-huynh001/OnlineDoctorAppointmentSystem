import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrl: './all.component.scss'
})
export class AllComponent implements OnInit {
  breadCrumbItems!: Array<{}>

  constructor() {

  }

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'Home' },
      { label: 'Appointment Management' },
      { label: 'All', active: true }
    ]
  }
}
