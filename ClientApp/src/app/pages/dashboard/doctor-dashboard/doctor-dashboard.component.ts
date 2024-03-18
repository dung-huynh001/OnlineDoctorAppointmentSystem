import { Component, OnInit } from '@angular/core';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-doctor-dashboard',
  templateUrl: './doctor-dashboard.component.html',
  styleUrl: './doctor-dashboard.component.scss'
})
export class DoctorDashboardComponent implements OnInit {
  breadCrumbItems!: Array<{}>
  today = new Date().toDateString();

  constructor(public toastService: ToastService) {

  }

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'Menu'},
      { label: 'Dashboard', Active: true}
    ];

    if (localStorage.getItem('toast')) {
      this.toastService.success('Logged in Successfully.');
      localStorage.removeItem('toast');
    }
  }
}
