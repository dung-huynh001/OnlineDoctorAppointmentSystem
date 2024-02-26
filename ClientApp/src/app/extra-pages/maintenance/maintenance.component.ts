import { Component } from '@angular/core';

@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrl: './maintenance.component.scss',
})
export class MaintenanceComponent {
  // set the current year
  year: number = new Date().getFullYear();

  constructor() {}

  ngOnInit(): void {}
}
