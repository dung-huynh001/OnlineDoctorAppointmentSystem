import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-completed',
  templateUrl: './completed.component.html',
  styleUrl: './completed.component.scss'
})
export class CompletedComponent implements OnInit {
  breadCrumbItems!: Array<{}>

  constructor() {

  }

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'Menu' },
      { label: 'Appointment Management' },
      { label: 'Completed', active: true }
    ]
  }
}
