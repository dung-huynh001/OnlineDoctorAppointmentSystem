import { Component } from '@angular/core';

@Component({
  selector: 'app-cancelled',
  templateUrl: './cancelled.component.html',
  styleUrl: './cancelled.component.scss'
})
export class CancelledComponent {
  breadCrumbItems!: Array<{}>

  constructor() {

  }

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'Home' },
      { label: 'Appointment Management' },
      { label: 'Cancelled', active: true }
    ]
  }
}
