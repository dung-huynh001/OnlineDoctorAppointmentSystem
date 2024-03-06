import { Component, OnInit } from '@angular/core';
import { ToastService } from '../../account/login/toast-service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
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
      this.toastService.show('Logged in Successfully.', { classname: 'bg-success text-center text-white', delay: 5000 });
      localStorage.removeItem('toast');
    }
  }
}
