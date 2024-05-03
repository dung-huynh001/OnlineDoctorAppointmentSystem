import { Component, OnInit } from '@angular/core';
import { StatisticService } from '../../../core/services/statistic.service';
import { User } from '../../../core/models/auth.models';
import { AuthService } from '../../../core/services/auth.service';
import {
  AppointmentStatisticRequest,
  iGenderStatistic,
  iWidget,
} from '../../../core/models/statistic.model';

import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexStroke,
  ApexMarkers,
  ApexYAxis,
  ApexGrid,
  ApexTitleSubtitle,
  ApexLegend,
} from 'ng-apexcharts';
import { Colors } from 'chart.js';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';
import { ToastService } from '../../../core/services/toast.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  markers: ApexMarkers;
  colors: string[];
  yaxis: ApexYAxis;
  grid: ApexGrid;
  legend: ApexLegend;
  title?: ApexTitleSubtitle;
};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  breadCrumbItems!: Array<{}>;

  currentUser!: User;

  appointmentWidgets!: Array<iWidget>;
  resourceWidgets!: Array<iWidget>;

  genderChart: any;

  option = {
    startVal: 0,
    useEasing: true,
    duration: 2,
  };

  statisticStartDate: Date = new Date();
  statisticEndDate: Date = new Date();

  appointmentChartOptions!: ChartOptions;

  genderStatisticData: Array<iGenderStatistic> = [];

  appointmentStatisticHeader!: {
    total: number;
    pending: number;
    confirmed: number;
    completed: number;
    cancelled: number;
  }

  constructor(
    private _statisticService: StatisticService,
    private _authService: AuthService,
    private _spinnerService: NgxSpinnerService,
    private _toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'Home' },
      { label: 'Dashboard', active: true },
    ];

    this.currentUser = this._authService.currentUser();

    this._statisticService
      .getStatisticAppointmentWidgets(
        this.currentUser.id,
        this.currentUser.userType
      )
      .subscribe((res) => (this.appointmentWidgets = res));

    this._statisticService
      .getStatisticResourceWidgets()
      .subscribe((res) => (this.resourceWidgets = res));

    this.renderGenderChart();
    this.renderTodayAppt();
  }

  renderTodayAppt() {
    this.statisticStartDate = new Date();
    this.statisticEndDate = new Date();
    this.renderAppointmentChart('today');
  }

  renderThisWeekAppt() {
    const today = new Date();

    const dayOfWeek = today.getDay();
    this.statisticStartDate = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - dayOfWeek
    );

    this.statisticEndDate = new Date(
      this.statisticStartDate.getFullYear(),
      this.statisticStartDate.getMonth(),
      this.statisticStartDate.getDate() + 6
    );

    this.renderAppointmentChart('this week');
  }

  renderThisMonthAppt() {
    const currentDate = new Date();
    this.statisticStartDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );
    this.statisticEndDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    );

    this.renderAppointmentChart('this month');
  }

  renderAppointmentChartByDate(renderBy?: string) {
    if(this.statisticStartDate < this.statisticEndDate) {
      this.renderAppointmentChart(renderBy);
    }
    else {
      this._toastService.error("The start date must be less than the end date")
    }
  }

  renderAppointmentChart(renderBy?: string) {
    this._spinnerService.show();

    const data: AppointmentStatisticRequest = {
      from: this.statisticStartDate,
      to: this.statisticEndDate,
      renderBy: renderBy ?? 'today',
    };
    this._statisticService
      .statisticAppointment(data)
      .pipe(
        finalize(() => {
          this._spinnerService.hide();
        })
      )
      .subscribe((res) => {
        this.appointmentStatisticHeader = {
          total: 0,
          cancelled: 0,
          completed: 0,
          confirmed: 0,
          pending: 0,
        };
        res.series.forEach((s) => {
          s.data.forEach((d) => (this.appointmentStatisticHeader.total += d));
          if (s.name.toLowerCase().includes('pending')) {
            s.data.forEach(
              (d) => (this.appointmentStatisticHeader.pending += d)
            );
          } else if (s.name.toLowerCase().includes('confirmed')) {
            s.data.forEach(
              (d) => (this.appointmentStatisticHeader.confirmed += d)
            );
          } else if (s.name.toLowerCase().includes('completed')) {
            s.data.forEach(
              (d) => (this.appointmentStatisticHeader.completed += d)
            );
          } else {
            s.data.forEach(
              (d) => (this.appointmentStatisticHeader.cancelled += d)
            );
          }
        });

        this.appointmentChartOptions = {
          series: res.series,
          chart: {
            height: 350,
            type: 'line',
            dropShadow: {
              enabled: true,
              color: '#000',
              top: 18,
              left: 7,
              blur: 10,
              opacity: 0.2,
            },
            toolbar: {
              show: false,
            },
          },
          colors: res.colors,
          dataLabels: {
            enabled: true,
          },
          stroke: {
            curve: 'smooth',
          },
          grid: {
            borderColor: '#e7e7e7',
            row: {
              colors: ['#f3f3f3', 'transparent'],
              opacity: 0.5,
            },
          },
          markers: {
            size: 1,
          },
          xaxis: { ...res.xaxis },
          yaxis: {
            labels: {
              formatter: (val) => val.toFixed(0),
            },
            ...res.yaxis,
            stepSize: 1,
          },
          legend: {
            position: 'top',
            horizontalAlign: 'right',
            floating: true,
            offsetY: -25,
            offsetX: -5,
          },
        };
      });
  }

  renderGenderChart() {
    this._spinnerService.show();
    this._statisticService
      .statisticGender()
      .pipe(
        finalize(() => {
          this._spinnerService.hide();
        })
      )
      .subscribe((res) => {
        this.genderStatisticData = res;
        const series = res.map((item) => item.value);
        const label = res.map((item) => item.title);
        const color = res.map((item) => item.color);
        this.genderChart = {
          series: series,
          labels: label,
          chart: {
            type: 'donut',
            height: 224,
          },
          plotOptions: {
            pie: {
              size: 100,
              offsetX: 0,
              offsetY: 0,
              donut: {
                size: '70%',
                labels: {
                  show: true,
                  name: {
                    show: true,
                    fontSize: '18px',
                    offsetY: -5,
                  },
                  value: {
                    show: true,
                    fontSize: '20px',
                    color: '#000000',
                    fontWeight: 500,
                    offsetY: 5,
                  },
                  total: {
                    show: true,
                    fontSize: '13px',
                    label: 'Total patient',
                    color: '#9599ad',
                    fontWeight: 500,
                  },
                },
              },
            },
          },
          dataLabels: {
            enabled: false,
          },
          legend: {
            show: false,
          },
          stroke: {
            lineCap: 'round',
            width: 2,
          },
          Colors: color,
        };
      });
  }
}
