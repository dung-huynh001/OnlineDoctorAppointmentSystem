import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  breadCrumbItems!: Array<{}>
  today = new Date().toDateString();

  constructor() {

  }

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'Menu'},
      { label: 'Dashboard', Active: true}
    ]
  }
}
