import { Component, OnInit } from '@angular/core';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  breadCrumbItems!: Array<{}>;
  today = new Date().toDateString();

  constructor(private _toastService: ToastService) {}
  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'Home' },
      { label: 'Dashboard', active: true },
    ];

    if (localStorage.getItem('toast')) {
      this._toastService.success('Logged in Successfully.');
      localStorage.removeItem('toast');
    }
  }
}
