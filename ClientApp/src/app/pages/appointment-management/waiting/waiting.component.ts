import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-waiting',
  templateUrl: './waiting.component.html',
  styleUrl: './waiting.component.scss'
})
export class WaitingComponent implements OnInit{
  breadCrumbItems!: Array<{}>

  constructor() {

  }

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'Menu' },
      { label: 'Appointment Management' },
      { label: 'Waiting', active: true }
    ]
  }
}
